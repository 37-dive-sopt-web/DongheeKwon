import { useState } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (value: string) => {
    setSearch(value);
    console.log(search);
  };
  return { search, handleSearch };
};
