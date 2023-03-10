

export default interface User {
  username: string;
  image?: string; // TODO transform to image/blob
  moviesSeen: {movieId: string; posterPath: string;}[];
}