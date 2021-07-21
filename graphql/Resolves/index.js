const postResol = require('./posts');
const userResol = require('./users');
const commentResol = require('./comments');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResol.Query
    },
    Mutation: {
        ...userResol.Mutation,
        ...postResol.Mutation,
        ...commentResol.Mutation,
    },
    Subscription: {
        ...postResol.Subscription
    }
}