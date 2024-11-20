import { api } from "./api";

export default function (id: string) {
  return {
    getArtist: () => api(`/artists/${id}`),
    getArtistAlbums: () => api(`/artists/${id}/albums`),
    getArtistTopTracks: () => api(`/artists/${id}/top-tracks`),
    getRelatedArtists: () => api(`/artists/${id}/related-artists`),
  };
}
