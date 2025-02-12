import DogDetails from "@/components/dog-details";
import FilterDialog from "@/components/filter-dialog";
import SearchResultsContainer from "@/components/search-results-container";
import SortDialog from "@/components/sort-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <div className="flex flex-col md:flex-row gap-4">
          {/* Mobile filter button */}
          <div className="flex justify-end gap-4 md:hidden">
            <FilterDialog filters={filters} />
            <SortDialog filters={filters} />
          </div>

          {/* Tablet/Desktop filters */}
          <div className="hidden md:flex gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="breed">Breed</Label>
              <Input id="breed" type="text" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" className="col-span-3" />
            </div>
            {/* More filters can be added here */}
          </div>
        </div>

        <SearchResultsContainer dogDetailsComponent={DogDetails} />
      </div>
    </HydrationBoundary>
  );
}
