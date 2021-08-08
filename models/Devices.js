const { Schema, model } = require('mongoose');

const deviceShema = new Schema({
    deviceToken: String,
}, { timestamps: true });

module.exports = model('device', deviceShema);