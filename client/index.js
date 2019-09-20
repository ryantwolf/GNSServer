const WebSocketClient = require('websocket').client;

// Create a new websocket client
const client = new WebSocketClient();

// Handle when the connection fails
client.on('connectFailed', error => {
    console.error('Error connecting with the server: ' + error.message);
});

// Handle when the client connects
client.on('connect', connection => {
    console.log('The WebSocket Client has connected');
    
    // Handle connection errors
    connection.on('error', error => {
        console.log('Connection error: ' + error.message);
    });

    connection.on('close', (code, description) => {
        console.log(`The connection has been closed with code: ${code} and description: ${description}`);
    });

    connection.on('message', message => {
        console.log('Recieved message: ' + ((message.type==='utf8') ? message.utf8Data : message.binaryData));
    });

    const sendTest = () => {
        //Create some test data
        const testData = {
            name: 'Ryan',
            age: 17,
            birthday: new Date('9/16/2001')
        };
    
        //Send the data
        connection.sendUTF(JSON.stringify(testData));
    }

    sendTest();
});

// Connect to the server
client.connect('ws://localhost:3000', 'echo-protocol');