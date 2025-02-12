import { z } from "zod";

export const searchFilterSchema = z.object({
  breeds: z.array(z.string()),
  ageRange: z.array(z.number()).optional(),
});

export type SearchFilterData = z.infer<typeof searchFilterSchema>;
