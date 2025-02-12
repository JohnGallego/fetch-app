import { z } from "zod";

export const searchSortSchema = z.object({
  sortBy: z.enum(["breed", "age", "name"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type SearchSortData = z.infer<typeof searchSortSchema>;
