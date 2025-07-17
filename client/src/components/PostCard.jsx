import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg bg-white">
      <Link to={`/posts/${post.slug}`}>
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-60 object-cover rounded"
        />

      </Link>

      <h2 className="text-xl font-bold mt-2">
        <Link to={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>

      <p className="text-gray-600 text-sm">
        {post.excerpt || post.content.substring(0, 100)}...
      </p>

      <Link to={`/posts/${post.slug}`} className="text-orange-600 mt-2 inline-block hover:underline font-semibold">
        Read More →
      </Link>
    </div>
  );
};

export default PostCard;
