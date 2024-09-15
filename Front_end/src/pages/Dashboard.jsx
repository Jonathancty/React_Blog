import React, { useState } from "react";
import { dummyPosts } from "../data";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState(dummyPosts);
  return (
    <section className="min-h-screen bg-gray-100 py-8 px-8">
      <div className="container mx-auto px-4">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {posts.map((post) => {
              return (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden "
                >
                  <div className="flex justify-between items-center my-4 px-8">
                    <img
                      src={post.thumbnail}
                      alt=""
                      className="w-full max-w-sm h-32 object-cover rounded-md shadow-md"
                    />
                    <h5 className="text-lg font-semibold mb-2 mt-4 text-center px-8">
                      {post.title}
                    </h5>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
                      <Link
                        to={`/posts/${post.id}`}
                        className="inline-block px-4 py-2 rounded-md shadow-md bg-gray-500 text-white hover:bg-gray-600 transition duration-300"
                      >
                        View
                      </Link>
                      <Link
                        to={`/posts/${post.id}/edit`}
                        className="inline-block px-4 py-2 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/posts/${post.id}/delete`}
                        className="inline-block px-4 py-2 rounded-md shadow-md bg-red-500 text-white hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <h1>No posts found</h1>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
