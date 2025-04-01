const router = require('express').Router();
const {
    upload,
    getImages
} = require('../controllers/cloudinaryController');

router.post('/upload', upload);
router.get('/getImages/:tag', getImages);

module.exports = router;