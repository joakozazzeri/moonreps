import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import path from 'path';

const REQUIRED_ENV = [
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET_NAME',
  'R2_PUBLIC_URL_BASE',
];

export const isR2Configured = REQUIRED_ENV.every((key) => Boolean(process.env[key]));

const r2Client = isR2Configured
  ? new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    })
  : null;

const mimeToExt = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
};

const normalizePublicBase = () => {
  const base = process.env.R2_PUBLIC_URL_BASE || '';
  return base.endsWith('/') ? base.slice(0, -1) : base;
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

const ensureR2Configured = () => {
  if (!isR2Configured || !r2Client) {
    throw new Error('R2 is not configured. Check environment variables.');
  }
};

export const parseDataUrl = (dataUrl) => {
  const matches = dataUrl.match(/^data:(.*?);base64,(.*)$/);
  if (!matches) return null;
  return {
    mimeType: matches[1],
    base64: matches[2],
  };
};

export const uploadBufferToR2 = async ({ buffer, contentType, prefix = 'uploads', ext }) => {
  ensureR2Configured();
  const safeExt = ext || getExtensionFromMime(contentType) || 'bin';
  const key = `${prefix}/${Date.now()}-${crypto.randomUUID()}.${safeExt}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType || 'application/octet-stream',
    })
  );

  return `${normalizePublicBase()}/${key}`;
};

export const uploadRemoteImageToR2 = async (imageUrl, { prefix = 'uploads', timeoutMs = 30000, retries = 2 } = {}) => {
  ensureR2Configured();
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(imageUrl, { signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentTypeHeader = response.headers.get('content-type');
      const contentType = contentTypeHeader ? contentTypeHeader.split(';')[0].trim() : undefined;
      const ext =
        getExtensionFromMime(contentType) ||
        getExtensionFromUrl(imageUrl) ||
        'bin';

      return await uploadBufferToR2({ buffer, contentType, prefix, ext });
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        const backoff = 500 * (attempt + 1);
        await new Promise(resolve => setTimeout(resolve, backoff));
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw lastError;
};
