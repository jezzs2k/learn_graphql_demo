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

                return await newPost.save();
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};
