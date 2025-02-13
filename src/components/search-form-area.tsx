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
    console.log("handle submit in search-form-area", values);
    const currentFilters = queryParamsToFilters(
      Object.fromEntries(searchParams)
    );

    const updatedFilters: DogSearchParams = {
      ...currentFilters,
      breeds: values.breeds,
      ageMin: values.ageRange?.[0],
      ageMax: values.ageRange?.[1],
      zipCodes: values.zipCodes,
      page: 0,
    };

    const paramsString = filtersToQueryParams(updatedFilters);
    const searchUrl = `/search?${paramsString}`;
    console.log("handle submit in search-form-area params", paramsString);
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
      <div className="flex flex-col md:flex-row gap-4 md:items-center md: justify-center">
        {/* Mobile filter buttons */}
        <div className="flex justify-end gap-4 md:hidden pb-4">
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
        <div className="hidden md:flex md:flex-row gap-8 items-start">
          <div className="flex flex-col gap-2">
            <FilterForm
              className="flex-col md:flex-row items-center gap-4"
              id="filter-form"
              filters={initialFilters}
              onSubmit={handleFilterFormSubmit}
            />
            <Button
              type="submit"
              variant="outline"
              size="sm"
              form="filter-form"
              className="mt-2"
            >
              Update Filters
            </Button>
          </div>

          {/* Tablet/Desktop sort */}
          <div className="flex flex-col gap-2">
            <SortForm
              id="sort-form"
              filters={initialFilters}
              onSubmit={handleSortFormSubmit}
            />
            <Button
              type="submit"
              variant="outline"
              size="sm"
              form="sort-form"
              className="mt-2"
            >
              Update Sort
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
