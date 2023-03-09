import Genre from "./Genre";
import Movie from "./Movie";

export default interface MovieDetails extends Movie {
  // belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  // production_companies: Company[];
  // production_countries: Country[];
  revenue: number;
  runtime: number;
  // spoken_languages: Language[];
  status: string;
  tagline: string;
}