const { Schema, model } = require('mongoose');

const caShema = new Schema({
    tableData: String,
    totalCa: String,
}, { timestamps: true });

module.exports = model('ca', caShema);