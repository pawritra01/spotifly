import { Artist } from "./Artist";
import { Image } from "./Image";

export interface Album {
  album_type: string;
  total_tracks: number;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  type: string;
  uri: "spotify:album:2ItkLsSI5zZBFNKsUl3SUy";
  artists: Omit<Artist, "images">[];
  album_group: "album";
}
