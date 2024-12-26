import React from "react";
import PostCardItem from "@/components/specific/Blog/post-card-item";
import { PostDto } from "@/types/post/post.model";
import { twMerge } from "tailwind-merge";

interface Props {
  posts: PostDto[];
  className?: string;
}

const PostPageList = ({ posts, className }: Props) => {
  return (
    <div component-name="PostPageList"
         className={twMerge(`grid grid-cols-12 gap-6  ${className}`)}>
      {posts.map((post: PostDto) => (
        <PostCardItem key={post.id} dto={post} className={"md:col-span-6 col-span-12"} />))}
    </div>
  );
};

export default PostPageList;