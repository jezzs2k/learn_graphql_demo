const fetch = require("node-fetch");

const wakeUpDyno = (interval) => {
    try {
        const milliseconds = interval * 60000;
        console.log('Time', new Date().getMinutes())

        setTimeout(() => {
            console.log('Time', new Date().getMinutes())
            fetch('https://crawl-new-api.herokuapp.com/', {
                method: 'post',
                body: JSON.stringify({
                    "query": "query{wakeupDynoHeroku}"
                }),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(json => console.log(json));

            wakeUpDyno(interval);
        }, milliseconds);
    } catch (error) {
        console.log(error);
    }
};

module.exports = wakeUpDyno;