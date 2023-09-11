"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
// Components
import FavoriteButton from "./FavoriteButton";
// Types
import { Post } from "mongodb";

type PostCardProps = {
  post: Post;
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
  handleTagClick?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  key: any;
  favoriteButton?: boolean;
  editAndDeleteButtons?: boolean;
};

const PostCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
  favoriteButton = true,
  editAndDeleteButtons = false,
}: PostCardProps): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = useMemo(() => session?.user?.id, [session]);
  const sessionIdEqualsCreatorId = userId === post?.creator?._id;
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post?.prompt);
    navigator.clipboard.writeText(post?.prompt);
    setTimeout(() => setCopied(""), 300);
  };

  const handleProfileClick = () => {
    if (post?.creator?._id === session?.user?.id)
      return router.push("/user/profile");

    router.push(
      `/user/profile/${post?.creator?._id}?name=${post?.creator.username}`
    );
  };

  return (
    <div className="prompt_card relative">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={
              post?.creator?.image || "/assets/images/default_user_image.png"
            }
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-grey-900">
              {post?.creator?.username}
            </h3>
          </div>
        </div>
        <div
          id="buttons_container"
          className="flex gap-2 absolute top-2 right-2"
        >
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post?.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copied === post?.prompt ? "copied" : "copy"}
              width={16}
              height={16}
            />
          </div>
          {favoriteButton && <FavoriteButton post={post} />}
        </div>
      </div>
      {sessionIdEqualsCreatorId ? (
        <p
          className="my-4 font-satoshi text-sm text-gray-700 cursor-pointer"
          onClick={handleEdit}
        >
          {post?.prompt}
        </p>
      ) : (
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {post?.prompt}
        </p>
      )}

      <div className="w-min">
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post?.tag)}
        >
          #{post?.tag}
        </p>
      </div>
      {editAndDeleteButtons ? (
        <div className="mt-5 flex-center gap-4 border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default PostCard;
