"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { queryDogs } from "@/lib/queries";
import { queryParamsToFilters } from "@/lib/utils";
import { Dog, DogSearchParams } from "@/types/dog";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

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

  return (
    <ScrollArea>
      <div className="flex flex-col gap-4 p-4 max-h-[calc(100vh-200px)]">
        {data?.map((dog) => (
          <DogDetailsComponent key={dog.id} dog={dog} />
        ))}
      </div>
    </ScrollArea>
  );
}

export default SearchResultsContainer;
