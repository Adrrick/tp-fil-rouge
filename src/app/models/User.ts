export default interface User {
  uid: string;
  username: string;
  email: string;
  image?: string; // TODO transform to image/blob
  moviesSeen: { movieId: string; posterPath: string }[];
}
