import React from "react";
import { SearchResultItem } from "components/SearchResultItem";
import { useSearchResults } from "hooks";
export function SearchResults() {
  const results = useSearchResults();
  console.log(results);

  return (
    <div>
      {results.map((r) => (
        <SearchResultItem
          id={r.id}
          title={r.title}
          price={r.price}
          image={r.thumbnail}
        ></SearchResultItem>
      ))}
    </div>
  );
}
