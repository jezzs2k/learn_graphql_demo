const { Schema, model } = require('mongoose');

const newsShema = new Schema({
    image: String,
    title: String,
    date: String,
    content: String,
    detail: String,
    newId: String,
}, { timestamps: true });

module.exports = model('news', newsShema);