"use client";

import { Button } from "@/components/ui/button";
import { filtersToQueryParams, queryParamsToFilters } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  size: number;
}

const Pagination = ({ currentPage, totalPages, size }: PaginationProps) => {
  // Receive pageSize prop
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) {
      return;
    }

    // 1. Get current filters from URLSearchParams using queryParamsToFilters
    const currentFilters = queryParamsToFilters(
      Object.fromEntries(searchParams)
    );

    // 2. Update the page in the filters object
    const updatedFilters = {
      ...currentFilters,
      page: newPage,
      size: size,
    };

    // 3. Convert updated filters back to query parameters string using filtersToQueryParams
    const paramsString = filtersToQueryParams(updatedFilters).toString();

    // 4. Push the new URL
    router.push(`/search?${paramsString}`);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      // Show all pages if totalPages is small
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first 2 pages
      pageNumbers.push(1, 2);

      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        pageNumbers.push(null); // Ellipsis
      }

      // Show pages around current page
      for (
        let i = Math.max(3, currentPage - 2);
        i <= Math.min(totalPages - 2, currentPage + 2);
        i++
      ) {
        pageNumbers.push(i);
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        pageNumbers.push(null); // Ellipsis
      }

      // Always show last 2 pages
      pageNumbers.push(totalPages - 1, totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex w-full justify-center items-center pb-4 pt-2">
      {/* Mobile Pagination */}
      <div className="md:hidden flex justify-between w-full max-w-sm">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-1/2 mr-2"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-1/2 ml-2"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden md:flex w-full">
        <Button
          variant="outline"
          className="mr-auto"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeftIcon className="h-4 w-4 mr-2" /> Previous
        </Button>
        {pageNumbers.map((page, index) => {
          if (page === null) {
            return (
              <Button variant="outline" key={`ellipsis-${index}`} disabled>
                ...
              </Button>
            );
          }
          return (
            <Button
              variant={currentPage === page ? "default" : "outline"}
              key={page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          );
        })}
        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="ml-auto"
        >
          Next <ChevronRightIcon className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
