import React, { useState, useEffect } from "react"; // Import useState and useEffect
import PostCard from "./PostCard";
import { Post } from "mongodb";
import useFavoritePosts from "@hooks/useFavouritePosts";

type ProfileProps = {
  name: string;
  description: string;
  data: any;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
};

const Profile = ({
  name,
  description,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <div className="mt-10 prompt_layout">
        {data.map((post: Post, index: number) => (
          <PostCard
            key={`${post.id}-${index}`}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
