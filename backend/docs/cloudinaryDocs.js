/**
 * @swagger
 * tags:
 *   - name: Cloudinary (JWT required)
 *     description: Endpoints related to adding Images for any user type. Don't use these as I am justing testing for myself with these apis
 */


//! UPLOAD
/**
 * @swagger
 * /api/cloudinary/upload:
 *   post:
 *     tags:
 *       - Cloudinary (JWT required)
 *     summary: Upload an image to Cloudinary.
 *     description: >
 *       Accepts a JSON payload containing a base64 encoded image string and tags (an array of strings),
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
 *                 description: The base64 encoded image string (data URI).
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
 *               properties:
 *                 asset_id:
 *                   type: string
 *                   description: Unique identifier assigned by Cloudinary.
 *                   example: d8bb7fdc06159f5959bdac6d407cd553
 *                 public_id:
 *                   type: string
 *                   description: Public identifier for accessing the resource.
 *                   example: h2ftspcvlixgsdc9pex4
 *                 version:
 *                   type: integer
 *                   description: Version number of the asset.
 *                   example: 1744880060
 *                 version_id:
 *                   type: string
 *                   description: Internal version identifier.
 *                   example: 4dc55c4b34e4c756e25e8556ae09920b
 *                 signature:
 *                   type: string
 *                   description: Signature for API calls verification.
 *                   example: cccc17cbf01559656f229259d7658a9ef718b5d5
 *                 width:
 *                   type: integer
 *                   description: Width of the uploaded image in pixels.
 *                   example: 1024
 *                 height:
 *                   type: integer
 *                   description: Height of the uploaded image in pixels.
 *                   example: 576
 *                 format:
 *                   type: string
 *                   description: File format of the uploaded image.
 *                   example: jpg
 *                 resource_type:
 *                   type: string
 *                   description: Type of the resource uploaded.
 *                   example: image
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: ISO8601 timestamp of upload.
 *                   example: "2025-04-17T08:54:20Z"
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of tags associated with the image.
 *                   example:
 *                     - restaurant2
 *                 bytes:
 *                   type: integer
 *                   description: File size in bytes.
 *                   example: 116576
 *                 type:
 *                   type: string
 *                   description: Upload type/category.
 *                   example: upload
 *                 etag:
 *                   type: string
 *                   description: ETag for caching purposes.
 *                   example: 8091e28aeb077bd9f7d3de984b6541e5
 *                 placeholder:
 *                   type: boolean
 *                   description: Indicates if the asset is a placeholder.
 *                   example: false
 *                 url:
 *                   type: string
 *                   format: uri
 *                   description: HTTP URL to access the uploaded image.
 *                   example: http://res.cloudinary.com/dr1sqiouu/image/upload/v1744880060/h2ftspcvlixgsdc9pex4.jpg
 *                 secure_url:
 *                   type: string
 *                   format: uri
 *                   description: HTTPS URL to access the uploaded image.
 *                   example: https://res.cloudinary.com/dr1sqiouu/image/upload/v1744880060/h2ftspcvlixgsdc9pex4.jpg
 *                 asset_folder:
 *                   type: string
 *                   description: Folder in Cloudinary where the asset is stored (if any).
 *                   example: ""
 *                 display_name:
 *                   type: string
 *                   description: Display name of the uploaded asset.
 *                   example: h2ftspcvlixgsdc9pex4
 *                 api_key:
 *                   type: string
 *                   description: API key used for the upload.
 *                   example: "897849593445172"
 *               required:
 *                 - asset_id
 *                 - public_id
 *                 - version
 *                 - signature
 *                 - width
 *                 - height
 *                 - format
 *                 - resource_type
 *                 - created_at
 *                 - tags
 *                 - bytes
 *                 - type
 *                 - url
 *                 - secure_url
 *       400:
 *         description: Missing required fields (imageBase64 or tags).
 *       500:
 *         description: An error occurred during the upload. Call Omar
 */

//! GET IMAGES FOR A CERTAIN TAG

/**
 * @swagger
 * /api/cloudinary/getImages/{tag}:
 *   get:
 *     tags:
 *       - Cloudinary (JWT required)
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