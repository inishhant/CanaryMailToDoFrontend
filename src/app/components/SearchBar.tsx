"use client";

import { useEffect, useState } from "react";
import { Dropdown } from "./ui/Dropdown";
import { debounce } from "lodash";

const dropdown = [
  { title: "Text", value: "text", key: "text" },
  { title: "Tag", value: "tag", key: "tag" },
];

export default function SearchBar({
  onSearch,
}: {
  onSearch: (params: { type: string; query: string }) => void;
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"tag" | "text">("text");

  // Debounce wrapper
  const debouncedSearch = debounce((query: string, type: string) => {
    onSearch({ type, query });
  }, 400);

  useEffect(() => {
    debouncedSearch(query, type);
    return () => debouncedSearch.cancel();
  }, [query, type]);

  return (
    <div className="relative w-full">
      {/* Dropdown positioned inside input */}
      <div className="absolute inset-y-0 left-0 w-28 flex items-center">
        <Dropdown
          className="w-full h-full border-none bg-transparent text-sm"
          itemArray={dropdown}
          onChange={(val) => setType(val as "text" | "tag")}
          defaultValue="text"
        />
      </div>

      {/* Input with left padding */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 pl-32 border rounded-md"
        placeholder="Search..."
      />
    </div>
  );
}
