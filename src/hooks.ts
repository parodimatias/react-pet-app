import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { atom, useRecoilValue, selector, useSetRecoilState } from "recoil";

const queryState = atom({
  key: "query",
  default: "",
});

const resultsState = selector({
  key: "resultState",
  get: async ({ get }) => {
    const queryValue = get(queryState);
    if (queryValue) {
      const response = await fetch(
        "https://api.mercadolibre.com/sites/MLA/search?q=$" + queryValue
      );
      const data = await response.json();
      return data.results;
    } else {
      console.log("devolviendo array vacio");
      return [];
    }
  },
});

export function useSearchResults() {
  const params = useParams();
  const setQuery = useSetRecoilState(queryState);
  const results = useRecoilValue(resultsState);
  useEffect(() => {
    if (params.query) {
      setQuery(params.query);
    }
  }, [params.query]);
  return results;
}
export function useResults() {
  const results = useRecoilValue(resultsState);
  return results;
}
