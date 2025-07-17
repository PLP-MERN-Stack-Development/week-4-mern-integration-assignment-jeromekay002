import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreatePost = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        featuredImage: null,
        category: '',
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove non-word chars
            .replace(/\-\-+/g, '-'); // Collapse multiple -
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/categories');
                setCategories(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching categories", err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'featuredImage') {
            setFormData({ ...formData, featuredImage: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('content', formData.content);
            data.append('featuredImage', formData.featuredImage);
            data.append('category', formData.category);

            const slug = slugify(formData.title);
            data.append('slug', slug);

            // 👇 Use logged-in user ID (assuming backend verifies token and extracts user)
            data.append('author', user._id);

            await axios.post('/api/posts', data);
            setMessage('Post created successfully!');
        } catch (err) {
            console.error('Error creating post', err);
            setMessage('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
            {message && <p className="mb-2 text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Post Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    name="content"
                    placeholder="Post Content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full border p-2 rounded h-40"
                    required
                />
                <input
                    type="file"
                    name="featuredImage"
                    onChange={handleChange}
                    className="w-full"
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
