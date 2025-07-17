// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard'; // same card used on Home

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [catRes, postRes] = await Promise.all([
          axios.get('/api/categories'),
          axios.get('/api/posts'),
        ]);

        const categoriesData = Array.isArray(catRes.data) ? catRes.data : [];
        const postsData = Array.isArray(postRes.data) ? postRes.data : [];

        // Add post count to each category
        const categoriesWithCounts = categoriesData.map(cat => {
          const postCount = postsData.filter(
            post => post.category && post.category._id === cat._id
          ).length;
          return { ...cat, postCount };
        });

        setCategories(categoriesWithCounts);
        setPosts(postsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories or posts", err);
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🗂 All Categories</h1>

      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(category => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
