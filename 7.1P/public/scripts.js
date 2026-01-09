// Initialize socket connection
const socket = io();

// Get DOM elements
const notificationInput = document.getElementById('notificationInput');
const sendBtn = document.getElementById('sendBtn');
const notificationArea = document.getElementById('notificationArea');

// Listen to 'notify' event
socket.on('notify', (msg) => {
    console.log('Notification received:', msg);
    displayNotification(msg);
});

// Display notification in the notification area
function displayNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    notificationArea.appendChild(notification);
}

// Send notification
sendBtn.addEventListener('click', () => {
    const message = notificationInput.value;
    if (message.trim()) {
        socket.emit('send-notification', {
            message: message
        });
        notificationInput.value = '';
    }
});

// Allow Enter key to send notification
notificationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

