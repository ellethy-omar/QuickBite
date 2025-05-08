const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({ 
    cloud_name: 'dr1sqiouu', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = async (req, res) => {
    try {
        const { imageBase64, tags } = req.body;
    
        if (!imageBase64) {
          return res.status(400).json({ error: 'Image base64 string is required.' });
        }
        if (!tags) {
          return res.status(400).json({ error: 'Tags are required.' });
        }

        const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
          tags: tags
        });
    
        res.json(uploadResponse);
      } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
      }
};

const uploadBase64Image = async (base64, tags = []) => {
  if (!base64) throw new Error('No image provided');

  let dataUri = base64.startsWith('data:')
    ? base64
    : `data:image/jpeg;base64,${base64}`;

  return await cloudinary.uploader.upload(dataUri, { tags });
};

const getImages = async (req, res) => {
    try {
      const { tag } = req.params;
      if (!tag) {
        return res.status(400).json({ error: 'Tag parameter is required.' });
      }
  
      const result = await cloudinary.search
        .expression(`tags:${tag}`)
        .max_results(30)
        .execute();
  
      res.json(result);
    } catch (error) {
      console.error('Image fetch error:', error);
      res.status(500).json({ error: error.message });
    }
};
  
module.exports = {
    upload,
    getImages,
    uploadBase64Image
}