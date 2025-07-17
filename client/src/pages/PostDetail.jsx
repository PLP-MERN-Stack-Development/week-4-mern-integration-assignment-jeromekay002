import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch'; // ✅ import your custom hook

const PostDetail = () => {
  const { slug } = useParams(); // Get slug from URL
  const { data: post, loading, error } = useFetch(`/api/posts/slug/${slug}`); // ✅ useFetch instead of manual useEffect

  if (loading) return <p className="p-4">Loading post...</p>;
  if (error) return <p className="p-4 text-red-600">Error fetching post.</p>;
  if (!post) return <p className="p-4 text-red-600">Post not found.</p>;

  return (
    <div>
      <h1 className='text-center font-bold text-3xl underline m-3'>Post Details</h1>
      <div className="container mx-auto p-4 flex justify-center">
        <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-6 border">
          <img
            src={`http://localhost:5000/uploads/${post.featuredImage}`}
            alt={post.title}
            className="w-full h-60 object-cover rounded"
          />

          <h1 className="text-3xl font-bold mb-2 capitalize">{post.title}</h1>
          <p className="text-gray-500 mb-1">
            {post.author?.name && <span>By {post.author.name}</span>}{" "}
            {post.category?.name && (
              <span className="ml-2">| Category: {post.category.name}</span>
            )}
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Views: {post.viewCount} | Created on: {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="text-lg leading-7 text-gray-800">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
