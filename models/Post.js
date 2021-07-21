const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    body: String,
    username: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
        }
    ],
    likes: [
        {
            username: String,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: String,
    updateAt: String,
}, { timestamps: true });

module.exports = model('Post', postSchema);