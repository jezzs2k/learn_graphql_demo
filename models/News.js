const { Schema, model } = require('mongoose');

const newsShema = new Schema({
    image: String,
    title: String,
    date: String,
    content: String,
    detail: String,
    newId: String,
    realTimeOfNews: Number,
}, { timestamps: true });

module.exports = model('news', newsShema);