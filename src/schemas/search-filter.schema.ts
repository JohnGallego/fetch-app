import { z } from "zod";

export const searchFilterSchema = z.object({
  breeds: z.array(z.string()),
  sort: z.enum(["asc", "desc"]).optional(),
});

export type SearchFilterData = z.infer<typeof searchFilterSchema>;
