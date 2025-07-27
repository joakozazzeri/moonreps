// pages/api/upload.js
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with credentials from .env.local
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: 'repse-ecommerce', // Optional: store images in a specific folder
      });

      // Send back the secure URL of the uploaded image
      res.status(200).json({ url: result.secure_url });

    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'Image could not be uploaded.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}