"use client";

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
import { SearchSortData, searchSortSchema } from "@/schemas/search-sort.schema";
import { DogSearchParams } from "@/types/dog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface SortFormProps {
  id: string;
  filters: DogSearchParams;
  onSubmit: (values: SearchSortData) => void;
}

export default function SortForm({
  id,
  filters,
  onSubmit: onFormSubmit,
}: SortFormProps) {
  const form = useForm<SearchSortData>({
    resolver: zodResolver(searchSortSchema),
    defaultValues: {
      sortBy: filters?.sort ?? DEFAULTS.sort,
      sortDirection: filters?.sortDirection ?? DEFAULTS.sortDirection,
    },
  });

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onFormSubmit)}
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
            name="sortDirection"
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
      </form>
    </Form>
  );
}
