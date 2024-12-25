import React, { useMemo } from "react";
import NextImg from "next/image";
import { twMerge } from "tailwind-merge";
import { PostDto } from "@/types/post/post.model";
import Link from "next/link";

interface Props {
  className?: string;
  post: PostDto;
}

const PostCardItem = ({ className, post }: Props) => {

  const thumbnailSource = useMemo(() => {
    if (post?.thumbnail) {
      return post.thumbnail.startsWith("https://") ? post.thumbnail : `http://localhost:8090/upload${post.thumbnail}`;
    }
    return "";
  }, [post]);

  return (
    <Link href={`/blog/${post.excerpt}-${post.id}`} component-name="PostCardItem"
          className={twMerge(`shadow ${className}`)}>
      <NextImg src={thumbnailSource}
               alt={post.title} width={200} height={200}
               className={"rounded w-full h-full md:max-h-[400px]"} />
    </Link>
  );
};

export default PostCardItem;