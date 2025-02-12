import DogDetails from "@/components/dog-details";
import SearchFormArea from "@/components/search-form-area"; // Import SearchFormArea
import SearchResultsContainer from "@/components/search-results-container";
import { getQueryClient } from "@/lib/get-query-client";
import { queryBreeds, queryDogs } from "@/lib/queries";
import { queryParamsToFilters } from "@/lib/utils";
import { DogSearchParams } from "@/types/dog";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryClient = getQueryClient();
  const params = await searchParams;

  const filters: DogSearchParams = queryParamsToFilters(params);

  // Prefetch data on the server
  void queryClient.prefetchQuery(queryBreeds);
  void queryClient.prefetchQuery(queryDogs(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4 container mx-auto p-4">
        <SearchFormArea filters={filters} />{" "}
        <SearchResultsContainer dogDetailsComponent={DogDetails} />
      </div>
    </HydrationBoundary>
  );
}
