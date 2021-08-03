const { UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();

                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },

        async getPost(_, { post: { postId } }) {
            try {
                const post = await Post.findById({ _id: postId });

                return post;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        async createPost(_, { post: { body } }, context) {
            try {
                const user = checkAuth(context);
                const newPost = new Post({ body, user: user.id, username: user.username });

                // context.pubsub.publish('NEW_POST', {
                //     newPost,
                // });


                return await newPost.save();
            } catch (error) {
                throw new Error(error);
            }
        },

        async deletePost(_, { postId }, context) {
            try {
                const user = checkAuth(context);

                const post = await Post.findById(postId);

                if (!post) {
                    throw new UserInputError("Post not found", {
                        postId: "PostId is incorrect"
                    })
                };

                await post.delete();

                return {
                    message: "Post deleted successfully",
                }
            } catch (error) {
                throw new Error(error);
            }
        },

        async likePost(_, { postId }, context) {
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if (!post) {
                throw new UserInputError("Post not found", {
                    postId: "PostId is incorrect"
                })
            };

            const likeIndex = post.likes?.findIndex(l => String(l.user) === String(user.id));

            if (likeIndex === -1 || (!likeIndex && likeIndex !== 0)) {
                post.likes.push({
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                })
            } else {
                post.likes.splice(likeIndex, 1);
            }

            // context.pubsub.publish('NEW_POST', {
            //     newPost: {...post},
            // });

            await post.save();

            return post;
        }
    },
    // Subscription: {
    //     newPost: {
    //         subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    //     }
    // }
};
