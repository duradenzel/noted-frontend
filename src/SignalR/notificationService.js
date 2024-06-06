import { HubConnectionBuilder } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
    .withUrl('http://localhost:5010/NotificationHub') 
    .build();

    connection.start()
    .then(() => console.log('Connected to SignalR hub'))
    .catch(err => console.error('Error connecting to hub:', err));

    connection.on('ReceiveMessage', message => {
        console.log('Received message:', message);
        
    });


export default connection