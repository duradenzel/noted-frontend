// NotificationComponent.tsx
import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { Notification } from '../types';

const NotificationComponent: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5170/NotificationHub")
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveNotification", (notification: Notification) => {
            console.log(notification)
            setNotifications(notifications => [...notifications, notification]);
        });

        connection.start()
            .catch(error => console.error('SignalR Connection Error: ', error));

        return () => {
            connection.stop();
        };
    }, [notifications]);

    console.log(notifications)

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.toString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationComponent;
