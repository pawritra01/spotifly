export interface Track {
  id: string;
  uri: string;
  images: {
    url: string;
  }[];
  preview_url: string;
  artists: {
    name: string;
    uri: string;
    id: string;
  }[];
  album: {
    name: string;
    id: string;
    images: {
      url: string;
    }[];
  };
  duration_ms: number;
  name: string;
}
