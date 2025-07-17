import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postRes, categoryRes] = await Promise.all([
                    axios.get('/api/posts'),
                    axios.get('/api/categories'),
                ]);

                setPosts(postRes.data);

                // Map categories and count posts per category
                const categoryCounts = categoryRes.data.map((cat) => {
                    const postCount = postRes.data.filter(post => post.category && post.category._id === cat._id).length;
                    return { ...cat, postCount };
                });


                setCategories(categoryCounts);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>

            {/* --- Categories Section --- */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">📁 Browse Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map(cat => (
                        <CategoryCard key={cat._id} category={cat} />
                    ))}
                </div>
            </section>

            {/* --- Posts Section --- */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">📰 Latest Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
