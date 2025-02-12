"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULTS, SORT_FIELDS, SORT_ORDER } from "@/constants/search";
import { filtersToQueryParams, queryParamsToFilters } from "@/lib/utils";
import { SearchSortData, searchSortSchema } from "@/schemas/search-sort.schema";
import { DogSearchParams } from "@/types/dog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface SortDialogProps {
  filters: DogSearchParams;
}

export default function SortDialog({ filters }: SortDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);

  const form = useForm<SearchSortData>({
    resolver: zodResolver(searchSortSchema),
    defaultValues: {
      sortBy: filters?.sort ?? DEFAULTS.sort,
      sortOrder: filters?.sortDirection ?? DEFAULTS.sortDirection,
    },
  });

  function onSubmit(values: SearchSortData) {
    // 1. Parse current query params to filters object
    const currentFilters = queryParamsToFilters(
      Object.fromEntries(searchParams)
    );

    // 2. Prepare updated filters from form values, only updating sort
    const updatedFilters: DogSearchParams = {
      ...currentFilters, // Keep existing filters
      sort: values.sortBy,
      sortDirection: values.sortOrder,
      page: 0, // Reset page to 0 when sort changes
    };

    // 3. Convert updated filters to query params string
    const paramsString = filtersToQueryParams(updatedFilters);

    // 4. Push to router
    router.push(`/search?${paramsString}`);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Sort Results</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sort Results</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="sortBy"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Sort By</FormLabel>
                    <FormControl>
                      <Select onValueChange={onChange} defaultValue={value}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={value} />
                        </SelectTrigger>
                        <SelectContent>
                          {SORT_FIELDS.map((sortField) => (
                            <SelectItem key={sortField} value={sortField}>
                              {sortField}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Sort Order</FormLabel>
                    <FormControl>
                      <Select onValueChange={onChange} defaultValue={value}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={value} />
                        </SelectTrigger>
                        <SelectContent>
                          {SORT_ORDER.map((order) => (
                            <SelectItem key={order} value={order}>
                              {order}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-5 self-end">
              <DialogClose asChild>
                <Button type="submit" variant="secondary">
                  Close
                </Button>
              </DialogClose>

              <Button
                type="submit"
                variant="outline"
                disabled={!form.formState.isValid}
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
