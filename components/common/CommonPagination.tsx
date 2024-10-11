import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CommonPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
}
const CommonPagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: CommonPaginationProps) => {
  return (
    <div component-name="CommonPagination">
      current page: {currentPage}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((page, index) => {
            // Second last element
            if (index == totalPages) {
              return (
                <>
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage == index + 1}
                      onClick={() => onPageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              );
            }

            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage == index + 1}
                  onClick={() => onPageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CommonPagination;
