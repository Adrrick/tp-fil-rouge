import Company from "./Company";
import Country from "./Country";
import Genres from "./Genres";
import Movie from "./Movie";

export default interface MovieDetails extends Omit<Movie, "genre_ids"> {
  belongs_to_collection: any;  // todo: Add a new type  BelongsToCollection
  budget: number;
  genres: Genres[];
  homepage: string;
  imdb_id: string;
  production_companies: Company[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: any[]; // todo: Add a new type  SpokenLanguages
  status: string;
  tagline: string;
}