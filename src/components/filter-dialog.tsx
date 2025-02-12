"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { DEFAULTS } from "@/constants/search";
import { queryBreeds } from "@/lib/queries";
import { filtersToQueryParams, queryParamsToFilters } from "@/lib/utils";
import {
  SearchFilterData,
  searchFilterSchema,
} from "@/schemas/search-filter.schema";
import { DogSearchParams } from "@/types/dog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import BreedsCombo from "./breeds-combo";

interface FilterDialogProps {
  filters: DogSearchParams;
}

export default function FilterDialog({ filters }: FilterDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: breedsList } = useSuspenseQuery(queryBreeds);
  const [open, setOpen] = React.useState(false);

  const form = useForm<SearchFilterData>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: {
      breeds: filters?.breeds ?? [],
      ageRange: [
        filters?.ageMin ?? DEFAULTS.ageMin,
        filters?.ageMax ?? DEFAULTS.ageMax,
      ],
    },
  });

  function onSubmit(values: SearchFilterData) {
    // 1. Parse current query params to filters object
    const currentFilters = queryParamsToFilters(
      Object.fromEntries(searchParams)
    );

    // 2. Prepare updated filters from form values
    const updatedFilters: DogSearchParams = {
      ...currentFilters, // Keep existing filters (including sort)
      breeds: values.breeds,
      ageMin: values.ageRange?.[0],
      ageMax: values.ageRange?.[1],
      page: 0, // Reset page to 0 when filters change
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
        <Button>Filters</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Apply filters to narrow your search for your new furry companion!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="breeds"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Breeds</FormLabel>
                  <FormControl>
                    <BreedsCombo
                      availableBreeds={breedsList}
                      selectedBreeds={value as string[]}
                      onBreedsChange={onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    {value && value.length > 0 ? (
                      <>
                        Selected: {value.slice(0, 10).join(", ")}
                        {value.length > 10 ? (
                          <>
                            {" "}
                            and {value.length - 10} more ({value.length} total)
                          </>
                        ) : (
                          ``
                        )}
                      </>
                    ) : (
                      <span>No breeds selected. </span>
                    )}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ageRange"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Age Range</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      defaultValue={value}
                      onValueChange={onChange}
                      minStepsBetweenThumbs={1}
                    />
                  </FormControl>
                  <FormDescription>
                    {(value?.[0] ?? 0) < 1 ? "Under 1" : value?.[0]} -{" "}
                    {(value?.[1] ?? 0) < 1
                      ? "Under 1"
                      : value?.[1] === 10
                      ? "10+"
                      : value?.[1]}
                  </FormDescription>
                </FormItem>
              )}
            />

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
