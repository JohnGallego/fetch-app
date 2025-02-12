"use client";

import FilterDialog from "@/components/filter-dialog";
import FilterForm from "@/components/filter-form";
import SortDialog from "@/components/sort-dialog";
import SortForm from "@/components/sort-form";
import { Button } from "@/components/ui/button";
import { filtersToQueryParams, queryParamsToFilters } from "@/lib/utils";
import { SearchFilterData } from "@/schemas/search-filter.schema"; // Import types for onSubmit handlers
import { SearchSortData } from "@/schemas/search-sort.schema";
import { DogSearchParams } from "@/types/dog";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFormAreaProps {
  filters: DogSearchParams;
}

export default function SearchFormArea({
  filters: initialFilters,
}: SearchFormAreaProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterFormSubmit = (values: SearchFilterData) => {
    const currentFilters = queryParamsToFilters(
      Object.fromEntries(searchParams)
    );
    console.log(
      "current filters",
      currentFilters,
      "inital filters",
      initialFilters,
      "newfilters",
      values
    );
    const updatedFilters: DogSearchParams = {
      ...currentFilters,
      breeds: values.breeds,
      ageMin: values.ageRange?.[0],
      ageMax: values.ageRange?.[1],
      page: 0,
    };

    const paramsString = filtersToQueryParams(updatedFilters);
    const searchUrl = `/search?${paramsString}`;

    router.push(searchUrl);
  };

  const handleSortFormSubmit = (values: SearchSortData) => {
    const currentFilters = queryParamsToFilters(
      Object.fromEntries(searchParams)
    );

    const updatedFilters: DogSearchParams = {
      ...currentFilters,
      sort: values.sortBy,
      sortDirection: values.sortDirection,
      page: 0,
    };

    const paramsString = filtersToQueryParams(updatedFilters);
    const searchUrl = `/search?${paramsString}`;

    router.push(searchUrl);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Mobile filter buttons */}
        <div className="flex justify-end gap-4 md:hidden">
          <FilterDialog
            filters={initialFilters}
            onSubmit={handleFilterFormSubmit}
          />
          <SortDialog
            filters={initialFilters}
            onSubmit={handleSortFormSubmit}
          />
        </div>

        {/* Tablet/Desktop filters */}
        <div className="hidden gap-4 md:flex md:flex-col md:items-start">
          <div className="flex gap-4 items-center">
            <FilterForm
              className="flex-row"
              id="filter-form"
              filters={initialFilters}
              onSubmit={handleFilterFormSubmit}
            />
            <div className="mt-4">
              <Button type="submit" variant="outline" form="filter-form">
                Update Filters
              </Button>
            </div>
          </div>

          {/* Tablet/Desktop sort */}
          <div className="flex gap-4 items-center">
            <SortForm
              id="sort-form"
              filters={initialFilters}
              onSubmit={handleSortFormSubmit}
            />
            <div className="mt-8">
              <Button type="submit" variant="outline" form="sort-form">
                Update Sort
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
