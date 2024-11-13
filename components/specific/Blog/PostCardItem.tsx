import React, { useMemo } from "react";
import NextImg from "next/image";
import CommonIcon from "@/components/common/CommonIcon";
import { twMerge } from "tailwind-merge";
import { PostDto } from "@/types/post/post.model";
import Link from "next/link";

interface Props {
  className?: string;
  dto: PostDto;
}

const PostCardItem = ({ className, dto }: Props) => {

  const thumbnailSource = useMemo(() => {
    if (dto?.thumbnail) {
      const source = dto.thumbnail.startsWith("https://") ? dto.thumbnail : `http://localhost:8090/upload${dto.thumbnail}`;
      console.log({ source });
      return source;
    }
    return "";
  }, [dto]);

  return (
    <Link href={`/blog/${dto.excerpt}-${dto.id}`} component-name="PostCardItem"
          className={twMerge(`flex items-start  rounded-lg  shadow-1 ${className}`)}>
      <NextImg src={thumbnailSource}
               alt={dto.title} width={200} height={200}
               className={"flex-1 cursor-pointer rounded-l-lg h-[160px] w-[90px] object-cover"} />
      <div className={"flex flex-col relative flex-1 h-full border border-gray-300 border-l-0 rounded-r-lg p-2"}>
        <span className={"text-xs text-gray-700 font-semibold hover:underline cursor-pointer"}>{dto.type}</span>
        <h3 className={"text-base text-gray-900 font-bold cursor-pointer"}>{dto.title}</h3>
        <h4 className={"line-clamp-3 text-sm text-gray-500 font-normal cursor-pointer"}>{dto.excerpt}</h4>
        <div className={"flex items-center justify-end absolute right-2 bottom-2 left-2"}>

          <CommonIcon name={"emptyHeart"} size={20} />
        </div>
      </div>
    </Link>
  );
};

export default PostCardItem;