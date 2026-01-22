// scripts/migrate-image-urls-to-r2.js
const path = require('path');
const crypto = require('crypto');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const REQUIRED_ENV = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET_NAME',
  'R2_PUBLIC_URL_BASE',
];

const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const PAGE_SIZE = parseInt(process.env.MIGRATE_PAGE_SIZE || '100', 10);
const MAX_PRODUCTS = process.env.MIGRATE_MAX_PRODUCTS
  ? parseInt(process.env.MIGRATE_MAX_PRODUCTS, 10)
  : null;
const START_FROM = process.env.MIGRATE_START_FROM
  ? parseInt(process.env.MIGRATE_START_FROM, 10)
  : 0;
const CONCURRENCY = parseInt(process.env.MIGRATE_CONCURRENCY || '3', 10);
const DRY_RUN = process.env.DRY_RUN === 'true';
const ONLY_CLOUDINARY = process.env.MIGRATE_ONLY_CLOUDINARY === 'true';
const MAX_FAILED_SKIP = process.env.MIGRATE_MAX_FAILED_SKIP
  ? parseInt(process.env.MIGRATE_MAX_FAILED_SKIP, 10)
  : 500;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const normalizePublicBase = () => {
  const base = process.env.R2_PUBLIC_URL_BASE || '';
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

const mimeToExt = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
};

const getExtensionFromMime = (mimeType) => {
  if (!mimeType) return null;
  return mimeToExt[mimeType.toLowerCase()] || null;
};

const getExtensionFromUrl = (imageUrl) => {
  try {
    const url = new URL(imageUrl);
    const ext = path.extname(url.pathname || '').replace('.', '').toLowerCase();
    return ext || null;
  } catch {
    return null;
  }
};

const isR2Url = (url) =>
  url.includes('.r2.dev') || url.includes('.r2.cloudflarestorage.com');

const isCloudinaryUrl = (url) => url.includes('res.cloudinary.com');

const shouldMigrateUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (isR2Url(url)) return false;
  if (ONLY_CLOUDINARY && !isCloudinaryUrl(url)) return false;
  return true;
};

const parseImageUrls = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {
      return value.split('|').map((v) => v.trim()).filter(Boolean);
    }
  }
  return [];
};

const uploadRemoteImageToR2 = async (imageUrl, { prefix = 'repse-ecommerce-migrate', timeoutMs = 15000 } = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(imageUrl, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentTypeHeader = response.headers.get('content-type');
    const contentType = contentTypeHeader ? contentTypeHeader.split(';')[0].trim() : undefined;
    const ext = getExtensionFromMime(contentType) || getExtensionFromUrl(imageUrl) || 'bin';
    const key = `${prefix}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType || 'application/octet-stream',
      })
    );

    return `${normalizePublicBase()}/${key}`;
  } finally {
    clearTimeout(timeoutId);
  }
};

const mapWithConcurrency = async (items, limit, mapper) => {
  const results = new Array(items.length);
  let index = 0;

  const worker = async () => {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  };

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
};

const migrateProductImages = async (product) => {
  const urls = parseImageUrls(product.imageUrls);
  if (urls.length === 0) return { changed: false, urls };

  if (DRY_RUN) {
    const wouldMigrate = urls.some((url) => shouldMigrateUrl(url));
    return { changed: wouldMigrate, urls };
  }

  let changed = false;
  const migrated = await mapWithConcurrency(urls, CONCURRENCY, async (url) => {
    if (!shouldMigrateUrl(url)) return url;
    try {
      const newUrl = await uploadRemoteImageToR2(url);
      changed = true;
      return newUrl;
    } catch (error) {
      console.warn(`Failed to migrate image for product ${product.id}: ${url}`);
      console.warn(error.message || error);
      return url;
    }
  });

  return { changed, urls: migrated };
};

const run = async () => {
  let from = 0;
  let processed = 0;
  let updated = 0;
  let failed = 0;
  const failedProductIds = new Set();

  console.log(`Starting migration (start: ${START_FROM}, page size: ${PAGE_SIZE}, concurrency: ${CONCURRENCY}, dry run: ${DRY_RUN})`);

  while (true) {
    if (MAX_PRODUCTS && processed >= MAX_PRODUCTS) break;

    const rangeFrom = ONLY_CLOUDINARY ? 0 : from;
    const to = rangeFrom + PAGE_SIZE - 1;
    let query = supabase
      .from('products')
      .select('id,imageUrls')
      .order('id', { ascending: true })
      .range(rangeFrom, to);

    if (ONLY_CLOUDINARY) {
      query = query.ilike('imageUrls', '%cloudinary%');
      if (failedProductIds.size > 0 && failedProductIds.size <= MAX_FAILED_SKIP) {
        const ids = Array.from(failedProductIds).join(',');
        query = query.not('id', 'in', `(${ids})`);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error.message || error);
      break;
    }

    if (!data || data.length === 0) break;

    let updatedThisBatch = 0;
    let failedThisBatch = 0;

    for (const product of data) {
      if (MAX_PRODUCTS && processed >= MAX_PRODUCTS) break;

      try {
        const { changed, urls } = await migrateProductImages(product);
        processed += 1;

        if (changed) {
          if (!DRY_RUN) {
            const { error: updateError } = await supabase
              .from('products')
              .update({ imageUrls: JSON.stringify(urls) })
              .eq('id', product.id);

            if (updateError) {
              failed += 1;
              failedThisBatch += 1;
              failedProductIds.add(product.id);
              console.error(`Failed to update product ${product.id}:`, updateError.message || updateError);
              continue;
            }
          }

          updated += 1;
          updatedThisBatch += 1;
        }

        if (processed % 25 === 0) {
          console.log(`Progress: processed ${processed}, updated ${updated}, failed ${failed}`);
        }
      } catch (error) {
        failed += 1;
        failedThisBatch += 1;
        failedProductIds.add(product.id);
        console.error(`Unexpected error for product ${product.id}:`, error.message || error);
      }
    }

    if (ONLY_CLOUDINARY) {
      if (updatedThisBatch === 0 && failedThisBatch === 0) break;
      if (updatedThisBatch === 0 && failedThisBatch > 0 && failedProductIds.size > MAX_FAILED_SKIP) {
        console.warn('Too many failures detected, stopping to avoid infinite loop.');
        break;
      }
    } else {
      from += PAGE_SIZE;
    }
  }

  console.log('Migration finished.');
  console.log(`Processed: ${processed}`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
};

run().catch((error) => {
  console.error('Migration crashed:', error.message || error);
  process.exit(1);
});
