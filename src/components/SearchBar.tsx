import { useState } from "react";
import { useDebounce } from "../utils/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  console.log(debouncedSearch);
  return (
    <div className="searchBar-container">
      <div className="searchBar">
        <div>
          <MagnifyingGlassIcon />
        </div>
        <input
          type="search"
          placeholder="Search tasks by name or assignee"
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />
      </div>
      {search && (
        <ul>
          <SearchResults search={debouncedSearch} />
        </ul>
      )}
    </div>
  );
};
