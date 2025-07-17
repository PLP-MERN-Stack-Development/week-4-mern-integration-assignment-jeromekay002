// controllers/postcontroller.js
const Post = require("../models/Post");

// get all posts 
// get all posts with search & filter
exports.getAllPosts = async (req, res) => {
    try {
        const { search, category } = req.query;

        const query = {};

        // Search by title or content
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        const posts = await Post.find(query)
            .populate('author', 'name')
            .populate('category', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};


// to get a single post
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name')
            .populate('category', 'name');

        // if post is not found 
        if (!post) return res.status(404).json({
            error: 'Post not found for that ID'
        });

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            error: 'failed to fetch post error'
        })
    }
};

// CREATE a new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, author, category } = req.body;
        const featuredImage = req.file ? req.file.filename : 'default-post.jpg';

        const slug = title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');

        const post = new Post({
            title,
            content,
            featuredImage,
            slug,
            author,
            category,
        });

        await post.save();

        res.status(201).json({ success: true, data: post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// update a post based on ID
exports.updatePost = async (res, req) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        // if post not found
        if (!updatedPost) return res.status(404).json({
            error: 'post not found based on that ID'
        });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a post
exports.deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Post not found' });

        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};
