import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface CommonPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
}

const Pagination = ({
                      totalPages,
                      currentPage,
                      onPageChange
                    }: CommonPaginationProps) => {
  return (
    <div component-name="Pagination">
      {
        totalPages > 0 ? <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
                className={
                  currentPage <= 1
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((page, index) => {
              // Second last element
              if (index == totalPages) {
                return (
                  <>
                    <PaginationItem key={index}>
                      <PaginationLink
                        className="cursor-pointer"
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
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : undefined}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination> : <></>
      }
    </div>
  );
};

export default Pagination;
