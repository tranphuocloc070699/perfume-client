import React from "react";
import PostCardItem from "@/components/specific/Blog/post-card-item";
import { PostDto } from "@/types/post/post.model";
import { twMerge } from "tailwind-merge";
import AppTitle from "@/components/common/app-title";

interface Props {
  posts: PostDto[];
  className?: string;
}

const PostPageList = ({ posts, className }: Props) => {
  return (
    <div className={twMerge(`${className}`)}>
      <AppTitle
        loading={false}
        title={"Chia sẻ kiến thức"}
        icon={"graduationCap"}

      >
        <div component-name="PostPageList"
             className={twMerge(`grid grid-cols-12 gap-8 `)}>
          {posts.map((post: PostDto) => (
            <PostCardItem key={post.id} dto={post} className={"md:col-span-4 col-span-12"} />))}
        </div>
      </AppTitle>
    </div>

  );
};

export default PostPageList;