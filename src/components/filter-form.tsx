"use client";

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
    },
  });

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onFormSubmit)}
        className={cn("flex flex-col gap-8", className)}
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
            <FormItem className="min-w-[300px]">
              <FormLabel>Age Range</FormLabel>
              <FormControl className="slider-offset">
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
      </form>
    </Form>
  );
}
