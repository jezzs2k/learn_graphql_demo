const { UserInputError, AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const user = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not empty !'
                    }
                })
            }

            const post = await Post.findById(postId);

            if (!post) {
                throw new UserInputError('Post not found', {
                    errors: {
                        postId: 'Post id must exist !'
                    }
                })
            };

            post.comments.unshift({
                body,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            await post.save();

            return post;
        },

        deleteComment: async (_, { commentId, postId }, context) => {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if (!post) {
                throw new UserInputError('Post not found', {
                    errors: {
                        postId: 'Post id must exist !'
                    }
                })
            };

            const commentIndex = post.comments.findIndex(c => c.id === commentId);

            if (commentIndex === -1) {
                throw new UserInputError('Comment not found');
            }

            if (post.comments[commentIndex].username !== username) {
                throw new AuthenticationError('Action not arrow');
            }

            post.comments.splice(commentIndex, 1);

            await post.save();

            return post;
        }
    }
}