import React from "react";

const PostTitle = ({ type }) => {
  return (
    <h1 className="head_text text-left my-2 sm:mb-10">
      <span className="blue_gradient">{type} Post</span>
    </h1>
  );
};

export default PostTitle;
