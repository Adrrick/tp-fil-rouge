import Image from "./Image";

export default interface MovieImagesResult {
  id: number;
  backdrops: Image[];
  posters: Image[];
}