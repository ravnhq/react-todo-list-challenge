import { useDeferredValue, useState } from "react";
import { useDebounce } from "../utils/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const debouncedSearch = useDebounce(deferredSearch);
  return (
    <div>
      <div className="">
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
