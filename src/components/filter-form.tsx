"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { DEFAULTS } from "@/constants/search";
import { queryBreeds } from "@/lib/queries";
import { cn } from "@/lib/utils";
import {
  SearchFilterData,
  searchFilterSchema,
} from "@/schemas/search-filter.schema";
import { DogSearchParams } from "@/types/dog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import BreedsCombo from "./breeds-combo";

interface FilterFormProps {
  id: string;
  filters: DogSearchParams;
  onSubmit: (values: SearchFilterData) => void;
  className?: string;
}

export default function FilterForm({
  id,
  filters,
  onSubmit: onFormSubmit,
  className,
}: FilterFormProps) {
  const { data: breedsList } = useSuspenseQuery(queryBreeds);

  const form = useForm<SearchFilterData>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: {
      breeds: filters?.breeds ?? [],
      ageRange: [
        filters?.ageMin ?? DEFAULTS.ageMin,
        filters?.ageMax ?? DEFAULTS.ageMax,
      ],
      zipCodes: filters?.zipCodes ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onFormSubmit)}
        className={cn("flex flex-col gap-4", className)}
      >
        <FormField
          control={form.control}
          name="breeds"
          render={({ field: { value, onChange } }) => (
            <FormItem className="w-full md:max-w-[250px]">
              <FormLabel className="text-sm">Breeds</FormLabel>{" "}
              <FormControl>
                <BreedsCombo
                  availableBreeds={breedsList}
                  selectedBreeds={value as string[]}
                  onBreedsChange={onChange}
                />
              </FormControl>
              <FormDescription className="text-xs mt-1">
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
                  <span>No breeds selected.</span>
                )}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ageRange"
          render={({ field: { value, onChange } }) => (
            <FormItem className="w-full md:min-w-[250px] md:max-w-[250px]">
              <FormLabel className="text-sm">Age Range</FormLabel>{" "}
              <FormControl className="slider-offset">
                <Slider
                  min={0}
                  max={13}
                  step={1}
                  defaultValue={value}
                  onValueChange={onChange}
                  minStepsBetweenThumbs={1}
                />
              </FormControl>
              <FormDescription className="text-xs mt-1">
                {value?.[0] === 0
                  ? "No minimum"
                  : (value?.[0] ?? 0) < 1
                  ? "Under 1"
                  : `Min Age: ${value?.[0]}`}
                {" - "}
                {value?.[1] === 13
                  ? "No maximum"
                  : (value?.[1] ?? 0) < 1
                  ? "Under 1"
                  : `Max Age: ${value?.[1]}`}
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zipCodes"
          render={({ field }) => (
            <FormItem className="w-full md:max-w-[250px]">
              <FormLabel className="text-sm">Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter a zip code" {...field} />
              </FormControl>
              <FormDescription className="text-xs mt-1">
                Enter a single zip code to filter dogs by location.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
