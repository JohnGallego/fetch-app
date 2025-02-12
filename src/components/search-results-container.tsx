"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { DEFAULTS } from "@/constants/search";
import { queryDogs } from "@/lib/queries";
import { queryParamsToFilters } from "@/lib/utils";
import { Dog, DogSearchParams } from "@/types/dog";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "./pagination";

interface SearchResultsContainerProps {
  dogDetailsComponent: React.ComponentType<{ dog: Dog }>;
}

function SearchResultsContainer({
  dogDetailsComponent: DogDetailsComponent,
}: SearchResultsContainerProps) {
  const searchParams = useSearchParams();

  // Parse filters from URL using queryParamsToFilters
  const filters: DogSearchParams = queryParamsToFilters(
    Object.fromEntries(searchParams)
  );

  // Fetch data
  const { isPending, isError, error, data } = useQuery(queryDogs(filters));

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching dogs list: {error?.message}</div>;
  }

  const currentPage = filters.page !== undefined ? Number(filters.page) : 1;
  const dogs = data?.data || [];
  const totalCount = data?.totalCount || 0; // Default to 0 if totalCount is not returned
  const totalPages = Math.ceil(totalCount / DEFAULTS.size);

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        size={DEFAULTS.size}
      />

      <div className="flex justify-center pb-2 text-sm text-gray-500">
        {" "}
        {/* Added div for total count */}
        {totalCount.toLocaleString()} records found
      </div>

      <ScrollArea>
        <div className="flex flex-col gap-4 p-4 max-h-[calc(100vh-275px)] md:max-h-[calc(100vh-400px)] lg:grid lg:grid-cols-2 xl:grid-cols-3">
          {dogs.map((dog) => (
            <DogDetailsComponent key={dog.id} dog={dog} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

export default SearchResultsContainer;
