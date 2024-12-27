import React, { useMemo } from "react";
import NextImg from "next/image";
import Icon from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";
import { PostDto } from "@/types/post/post.model";
import Link from "next/link";
import Typography from "@/components/ui/typography";
import { formatDate } from "@/lib/utils";

interface Props {
  className?: string;
  dto: PostDto;
}

const PostCardItem = ({ className, dto }: Props) => {
  console.log({ dto: dto.updatedAt });
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
          className={twMerge(`${className} group`)}>
      <div>
        <div className={"overflow-hidden w-full h-[200px] rounded-t "}>
          <NextImg src={thumbnailSource}
                   alt={dto.title} width={200} height={200}
                   className={"w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"} />
        </div>
        <div className={"py-2 px-4 rounded-b border border-gray-300 border-t-0 h-[200px] relative"}>
          <Typography.Text
            className={"text-xs text-gray-500 font-medium"}>{formatDate(dto.updatedAt, "Ngày DD-MM-YYYY")}</Typography.Text>
          <Typography.H4 className={" text-gray-900 font-normal "}>{dto.title}</Typography.H4>
          <Typography.Text
            className={"text-sm text-gray-700 font-normal line-clamp-3 "}>{dto.excerpt}</Typography.Text>

          {/* Icon with hover effect */}
          <Icon name={"moveRight"} size={24}
                className={"absolute bottom-2 right-4 "} />
        </div>
      </div>
    </Link>
  );
};

export default PostCardItem;