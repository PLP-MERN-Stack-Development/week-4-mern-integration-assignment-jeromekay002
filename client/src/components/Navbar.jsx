import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-orange-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">MERN Blog</Link>
                <div className="space-x-2">
                    <Link to="/" className="mr-4 hover:underline">Home</Link>
                    <Link to="/create" className="hover:underline">New Post</Link>
                    {/* <Link to="/posts" className=" hover:underline">Post Detail</Link> */}
                    <Link to="/categories" className=" hover:underline">Categories</Link>
                    {/* <Link to="/register" className="hover:underline">Register</Link> */}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;