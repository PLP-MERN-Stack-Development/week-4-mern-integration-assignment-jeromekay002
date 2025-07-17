import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category._id}`} className="block border rounded p-4 shadow hover:shadow-md transition bg-yellow-100">
      <h3 className="text-lg font-bold mb-1">{category.name}</h3>
      <p className="text-sm text-gray-600">{category.postCount} {category.postCount === 1 ? 'post' : 'posts'}</p>
    </Link>
  );
};

export default CategoryCard;
