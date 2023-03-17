import Movie from "./Movie";

export default interface MoviesListResult {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}
