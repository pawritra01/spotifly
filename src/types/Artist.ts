import { Image } from "./Image";

export interface Artist {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  images: Image[];
  followers: {
    total: number;
  };
}
