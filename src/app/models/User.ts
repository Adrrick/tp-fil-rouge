

export default interface User {
  uid: string;
  username: string;
  image?: string; // TODO transform to image/blob
  moviesSeen: {movieId: string; posterPath: string;}[];
}