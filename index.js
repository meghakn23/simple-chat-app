// Import necessary modules
const WebSocket = require('ws');

// Create WebSocket server
const wss = new WebSocket.Server({ port: 3000 });

// Event handler for new WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Event handler for incoming messages
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Broadcast the received message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

console.log('WebSocket server is running');
