import { useState } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchHeader = ({
  placeholder = "Buscar gifs",
  onQuery,
}: Props) => {
  const [query, setQuery] = useState("");
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button onClick={() => onQuery(query)}>Buscar</button>
    </div>
  );
};
