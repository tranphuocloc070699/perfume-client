import React from "react";
import { BookDto } from "@/types/book/book.model";
import NextImg from "next/image";

type Props = {
  className?: string;
  book: BookDto;
};

const BookItem = ({ book, className }: Props) => {
  return (
    <div
      component-name="BookItem"
      className={`${className}`}
    >
      <NextImg
        src={book.thumbnail}
        alt={book.name}
        width={200}
        height={200}
        className="w-full h-auto object-cover rounded shadow-lg transition-all duration-500 transform hover:scale-105 cursor-pointer"
      />
    </div>
  );
};

export default BookItem;