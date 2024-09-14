import React from "react";
import { useState } from "react";
import { dummyPosts } from "../data";
import PostItem from "../components/PostItem";

const AuthorPosts = () => {
  const [posts, setPosts] = useState(dummyPosts);
  return (
    <>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map(({ id, thumbnail, category, title, desc, authorID }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              desc={desc}
              authorID={authorID}
            />
          ))}
        </div>
      ) : (
        <h2 className="font-semibold text-2xl font-sans text-center">
          {" "}
          No posts found!
        </h2>
      )}
    </>
  );
};

export default AuthorPosts;
