const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//? To be removed, I just put it here just in case Retaj wants to test that the server exists.

app.get("/", (req, res)=> {
    res.status(200).json(result = {
        statusbar: false,
        failure: "Task failed Succuessfiily! this is an invalid route"
    })
});

const integrationRouter = require('./routes/integrationRouter')
app.use('/api', integrationRouter);

//! Webosckets Don't touch this configuration

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const { WebSocketRoutes } = require('./websockets/mainWebsocket');
wss.on('connection', (ws, request) => {
  console.log('New WebSocket connection established');
  WebSocketRoutes(ws, request);
});

const PORT = process.env.PORT || 4123;
server.listen(PORT, () => {
  console.log(`Server for webosockets and http requests is running on port ${PORT}`);
});