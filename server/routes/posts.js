// routes/posts.js
const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { validatePost } = require('../middleware/validators/postValidator');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload'); // Multer middleware for image upload
const Post = require('../models/Post'); // ✅ You MUST have this

// Routes
router.get('/', postController.getAllPosts);

// define slug route before :id route
router.get('/slug/:slug', async (req, res) => {
    try {
        console.log('Requested slug:', req.params.slug); // ✅ Add this line

        const post = await Post.findOne({ slug: req.params.slug })
            .populate('author', 'name')
            .populate('category', 'name');

        if (!post) return res.status(404).json({ error: 'Post not found' });

        res.status(200).json(post);
    } catch (err) {
        console.error('Error fetching post by slug:', err); // ✅ log actual error
        res.status(500).json({ error: 'Server error fetching post by slug' });
    }
});

// must come AFTER slug route
router.get('/:id', postController.getPostById);


// Create a post with image upload and validation
router.post('/', upload.single('featuredImage'), validatePost, validate, postController.createPost);

// Update a post with image upload and validation
router.put(
    '/:id',
    upload.single('featuredImage'),
    validatePost,
    validate,
    postController.updatePost
);

router.delete('/:id', postController.deletePost);

module.exports = router;
