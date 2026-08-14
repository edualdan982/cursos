import { useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar gifs", onQuery }: Props) => {
  const [query, setQuery] = useState("");
  useEffect(() =>{
    console.log("Hola desde el efecto.");
  });
  const handleSearch = () => {
    onQuery(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => handleSearch()}>Buscar</button>
    </div>
  );
};
