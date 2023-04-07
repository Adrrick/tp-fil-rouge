import { MovieSchema } from "./Movie";
import { z } from "zod";


export const TheMovieDbApiResultSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_results: z.number(),
  total_pages: z.number(),
});

type TheMovieDbApiResult = z.infer<typeof TheMovieDbApiResultSchema>;

export default TheMovieDbApiResult;