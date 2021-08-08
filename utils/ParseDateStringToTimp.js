const ParseDate = (dateString) => {
    if (!dateString) {
        return new Date().getTime();
    }
    const temp = dateString.split(', ');

    if (temp?.length > 3) {
        throw new Error('Datestring is not parse');
    };

    const date = temp[1];
    const time = temp[2];

    const myDate = date.split('/')

    const newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
    const myTime = time.split(':');

    return newDate.getTime() + (Number(myTime[0]) * 60 * 60 + Number(myTime[1]) * 60) * 1000;
};

module.exports = { ParseDate }