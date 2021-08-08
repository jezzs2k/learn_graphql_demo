const fetch = require('node-fetch');
const firebase = require("firebase-admin");
const configJsonFirebase = require('../news-app-e0332-firebase-adminsdk-wqhga-92051d5565.json');

class PushNotifier {
    constructor() {
        const defaultAppConfig = {
            credential: firebase.credential.cert(configJsonFirebase),
            databaseURL: "https://news-app-e0332-default-rtdb.firebaseio.com/"
        };
        // Initialize the default app
        firebase.initializeApp(defaultAppConfig);
    }

    sendNotificationToDeviceIOS(devices, data) {
        let android = {
            priority: "High",
            ttl: 36000,
            data: {
                title: 'Thông tin mới về Covid',
                body: data.content,
            },
        };

        if (data) {
            if (devices?.lenght <= 0) {
                return;
            }

            let notification_body = {
                notification: android.data,
                registration_ids: devices,
            };

            fetch('https://fcm.googleapis.com/fcm/send', {
                'method': 'POST',
                'headers': {
                    // replace authorization key with your key
                    'Authorization': 'key=' + 'AAAANZUnLxk:APA91bEyLKooAFO6Wv6moezr3SEY1Oc_8covGW-bJ5DGuKsY-MJK4QrstcAAiXuxzgbhjPPLa_lmU5p0nzjqsBgOjPtAyRCjEtuWA1_2BN94Yvrc9D3cRirruZpNf4M2rQSczUMijwvp',
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify(notification_body)
            }).then(function (response) {
                // console.log(response);
            }).catch(function (error) {
                console.error(error);
            })
        } else {

        }
    }
}

module.exports = { PushNotifier };