import { z } from "zod";


export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  original_title: z.string(),
  poster_path: z.string(),
  adult: z.boolean(),
  overview: z.string(),
  release_date: z.string(),
  genre_ids: z.array(z.number()),
  original_language: z.string(),
  backdrop_path: z.string(),
  popularity: z.number(),
  vote_count: z.number(),
  video: z.boolean(),
  vote_average: z.number(),
})

type Movie = z.infer<typeof MovieSchema>;

export default Movie;