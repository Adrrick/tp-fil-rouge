import MovieSeen from './MovieSeen';

export default interface User {
  uid: string;
  username: string;
  email: string;
  image?: string; // TODO transform to image/blob
  moviesSeen: MovieSeen[];
  password: string;
  photoURL: string;
}
