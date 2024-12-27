import React from "react";
import { BookDto } from "@/types/book/book.model";
import BookItem from "./book-item";
import Typography from "@/components/ui/typography";
import ProductCardList from "@/components/specific/Product/product-card-list";
import AppTitle from "@/components/common/app-title";
import { twMerge } from "tailwind-merge";


type Props = {
  books: BookDto[];
  className?: string;
};

const BookList = ({ books, className }: Props) => {
  return (
    <div
      component-name="BookList"
      className={twMerge(`${className}`)}
    >

      <AppTitle
        loading={false}
        title={"Sách"}
        icon={"book"}
      >

        <div className={"flex flex-col gap-6"}>
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      </AppTitle>

    </div>
  );
};

export default BookList;