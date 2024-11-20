import { Artist } from "./Artist";
import { Track } from "./Track";

export interface AlbumOrPlaylist {
  id: string;
  name: string;
  uri: string;
  owner: {
    display_name: string;
  };
  artists: Artist[];
  images: {
    url: string;
  }[];
  type: "album" | "playlist";
  tracks: {
    items: PlaylistTrack[] | Track[];
  };
}

export interface PlaylistTrack {
  added_at: string;
  track: Track;
}
