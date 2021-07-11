const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    createAt: String,
    updateAt: String,
});

module.exports = model('User', userSchema);