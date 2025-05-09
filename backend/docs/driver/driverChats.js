/**
 * @swagger
 * /api/driver/getActiveChats:
*   get:
*     tags:
*       - Driver (JWT required)
*     summary: Retrieve active chat previews for the authenticated driver
*     description: |
*       Returns all active chats in which the driver participates.
*       Each entry includes:
*         - chat ID
*         - the user participant’s basic info (name, phone, profilePicture)
*         - the associated order’s ID, status, and totalAmount
*         - the most recent message preview (content, timestamp, whether it was sent by driver)
*         - the count of unread messages directed to the driver
*     responses:
*       200:
*         description: Array of chat preview objects
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   _id:
*                     type: string
*                     description: Chat identifier
*                     example: "681da884c86073324f32b50a"
*                   user:
*                     type: object
*                     description: The user participant in this chat
*                     properties:
*                       _id:
*                         type: string
*                         example: "68134748386fbc0e9a0cce1d"
*                       name:
*                         type: string
*                         example: "Alice"
*                       phone:
*                         type: string
*                         example: "+201234567890"
*                       profilePicture:
*                         type: string
*                         format: uri
*                         example: "https://…/avatar.jpg"
*                   order:
*                     type: object
*                     description: Basic order info for this chat
*                     properties:
*                       _id:
*                         type: string
*                         example: "abc123"
*                       status:
*                         type: string
*                         example: "processing"
*                       totalAmount:
*                         type: number
*                         format: float
*                         example: 42.50
*                   lastMessage:
*                     type: object
*                     nullable: true
*                     description: Most recent message in this chat
*                     properties:
*                       content:
*                         type: string
*                         example: "On my way!"
*                       createdAt:
*                         type: string
*                         format: date-time
*                         example: "2025-05-09T07:20:37.261Z"
*                       isFromDriver:
*                         type: boolean
*                         example: true
*                   unreadCount:
*                     type: integer
*                     description: Number of unread messages for this driver
*                     example: 2
*       403:
*         $ref: '#/components/responses/ParameterRequiredError'
*       420:
*         $ref: '#/components/responses/UnauthorizedError'
*       500:
*         $ref: '#/components/responses/ServerError'
 * /api/driver/getAllChatsDriver:
*   get:
*     tags:
*       - Driver (JWT required)
*     summary: Retrieve active chat previews for the authenticated driver
*     description: |
*       Returns all active chats in which the driver participates.
*       Each entry includes:
*         - chat ID
*         - the user participant’s basic info (name, phone, profilePicture)
*         - the associated order’s ID, status, and totalAmount
*         - the most recent message preview (content, timestamp, whether it was sent by driver)
*         - the count of unread messages directed to the driver
*     responses:
*       200:
*         description: Array of chat preview objects
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   _id:
*                     type: string
*                     description: Chat identifier
*                     example: "681da884c86073324f32b50a"
*                   user:
*                     type: object
*                     description: The user participant in this chat
*                     properties:
*                       _id:
*                         type: string
*                         example: "68134748386fbc0e9a0cce1d"
*                       name:
*                         type: string
*                         example: "Alice"
*                       phone:
*                         type: string
*                         example: "+201234567890"
*                       profilePicture:
*                         type: string
*                         format: uri
*                         example: "https://…/avatar.jpg"
*                   order:
*                     type: object
*                     description: Basic order info for this chat
*                     properties:
*                       _id:
*                         type: string
*                         example: "abc123"
*                       status:
*                         type: string
*                         example: "processing"
*                       totalAmount:
*                         type: number
*                         format: float
*                         example: 42.50
*                   lastMessage:
*                     type: object
*                     nullable: true
*                     description: Most recent message in this chat
*                     properties:
*                       content:
*                         type: string
*                         example: "On my way!"
*                       createdAt:
*                         type: string
*                         format: date-time
*                         example: "2025-05-09T07:20:37.261Z"
*                       isFromDriver:
*                         type: boolean
*                         example: true
*                   unreadCount:
*                     type: integer
*                     description: Number of unread messages for this driver
*                     example: 2
*       403:
*         $ref: '#/components/responses/ParameterRequiredError'
*       420:
*         $ref: '#/components/responses/UnauthorizedError'
*       500:
*         $ref: '#/components/responses/ServerError'
*
* /api/driver/getMessages:
*   get:
*     tags:
*       - Driver (JWT required)
*     summary: Retrieve and mark as read this driver’s chat messages
*     description: |
*       Fetches up to `limit` messages for the specified chat, sorted oldest→newest.
*       If `before` is provided, only messages created before that timestamp are returned.
*       All returned messages will be marked as read for the driver.
*     parameters:
*       - name: chatId
*         in: query
*         description: The ID of the chat to fetch messages from
*         required: true
*         schema:
*           type: string
*       - name: before
*         in: query
*         description: ISO timestamp; only messages created before this date will be returned
*         required: false
*         schema:
*           type: string
*           format: date-time
*       - name: limit
*         in: query
*         description: "Maximum number of messages to return (default: 20)"
*         required: false
*         schema:
*           type: integer
*           example: 20
*     responses:
*       200:
*         description: Messages payload and pagination flag
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 messages:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Message'
*                 hasMore:
*                   type: boolean
*                   description: Whether there are more older messages beyond this batch
*                   example: false
*       403:
*         $ref: '#/components/responses/ParameterRequiredError'
*       420:
*         $ref: '#/components/responses/UnauthorizedError'
 *       469:
 *         $ref: '#/components/responses/ForbiddenError'
*       500:
*         $ref: '#/components/responses/ServerError'
 * 
 */