const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');

const PORT = 9001;
const app = express();
const publicVapidKey = 'BFEoY37tH5XYv1VdHD3-kRplnJaTcUBVsFCN1dGgfebEIU-l6VUOL9U43SWY4Mf6EuoB-C4o8Nv2dt_tXCwwKso';
const privateVapidKey = '8I-Wj3uTIdILGo1BXL5nqNnYpdJ9RtezocPGhDayS94';
let count = 0;

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

webPush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

function sendNotifications(subscription) {
    const notificationData = JSON.stringify({ title: `Push notification test count: ${++count}` });

    webPush
        .sendNotification(subscription, notificationData)
        .catch(err => console.log(err));
}

app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    res.status(200).json({});

    const notificationData = JSON.stringify({ title: 'Push notification test' });

    webPush
        .sendNotification(subscription, notificationData)
        .catch(err => console.log(err));

    //setInterval(sendNotifications.bind(null, subscription), 10000);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));