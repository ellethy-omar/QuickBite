const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

const {
  intializeMongooseConnection,
  intializeMongoClientConnection
} = require('./config/db');

intializeMongooseConnection();

// Swagger configuration options
const swaggerConfigurations = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "QuickBite's Apis",
      version: '1.0.0',
    },
  },
  apis: ['./docs/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerConfigurations);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const integrationRouter = require('./routes/integrationRouter');
app.use('/api', integrationRouter);

// WebSockets setup
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const { WebSocketRoutes } = require('./websockets/mainWebsocket');
wss.on('connection', (ws, request) => {
  console.log('New WebSocket connection established');
  WebSocketRoutes(ws, request);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Invalid route' });
});

const PORT = process.env.PORT || 4123;
server.listen(PORT, () => {
  console.log(`Server for webosckets and http requests is running on port ${PORT}`);
});
