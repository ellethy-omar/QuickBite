//! UPLOAD
/**
 * @swagger
 * /api/cloudinary/upload:
 *   post:
 *     tags:
 *       - Cloudinary
 *     summary: Upload an image to Cloudinary.
 *     description: >
 *       Accepts a JSON payload containing a base64 encoded image string and tags, tags  is an array of strings
 *       then uploads the image to Cloudinary. Cloudinary accepts data URIs directly.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageBase64:
 *                 type: string
 *                 description: The base64 encoded image string.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags to associate with the image.
 *             required:
 *               - imageBase64
 *               - tags
 *     responses:
 *       200:
 *         description: The image was successfully uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing required fields (imageBase64 or tags).
 *       500:
 *         description: An error occurred during the upload.
 */

//! GET IMAGES FOR A CERTAIN TAG

/**
 * @swagger
 * /api/cloudinary/getImages/{tag}:
 *   get:
 *     tags:
 *       - Cloudinary
 *     summary: Retrieve images by tag from Cloudinary.
 *     description: >
 *       Fetches images from Cloudinary using the provided tag as a search parameter.
 *       The tag is provided as a path parameter and is used to filter images in Cloudinary.
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag to search for in Cloudinary.
 *     responses:
 *       200:
 *         description: A list of images matching the provided tag.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resources:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Details of each image returned by Cloudinary.
 *       400:
 *         description: Tag parameter is required.
 *       500:
 *         description: An error occurred while fetching images.
 */