import { api } from "./api";

export default function searchApi() {
  return {
    search: (searchTerm: string) =>
      api(
        `/search?q=${encodeURI(
          searchTerm
        )}&limit=20&market=IN&type=artist%2Cplaylist%2Calbum%2Ctrack`
      ),
  };
}
