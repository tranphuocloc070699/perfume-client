import React from "react";
import PostCardItem from "@/components/specific/Blog/PostCardItem";
import { PostDto } from "@/types/post/post.model";

interface Props {
  posts: PostDto[];
}

const PostPageList = ({ posts }: Props) => {
  return (
    <div component-name="PostPageList"
         className={"grid grid-cols-12 gap-6 "}>
      {posts.map((post: PostDto) => (
        <PostCardItem key={post.id} dto={post} className={"md:col-span-6 col-span-12"} />))}
    </div>
  );
};

export default PostPageList;