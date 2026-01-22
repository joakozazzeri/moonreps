// pages/api/upload.js
import { parseDataUrl, uploadBufferToR2 } from '../../lib/r2';

// Increase the body size limit to handle larger image files
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { image } = req.body; // Expecting a Base64 image string

      if (!image) {
        return res.status(400).json({ error: 'No image provided.' });
      }

      const parsed = parseDataUrl(image);
      if (!parsed) {
        return res.status(400).json({ error: 'Invalid image format.' });
      }

      const buffer = Buffer.from(parsed.base64, 'base64');
      const url = await uploadBufferToR2({
        buffer,
        contentType: parsed.mimeType,
        prefix: 'repse-ecommerce',
      });

      res.status(200).json({ url });

    } catch (error) {
      console.error('Error uploading to R2:', error);
      res.status(500).json({ error: 'Image could not be uploaded.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
