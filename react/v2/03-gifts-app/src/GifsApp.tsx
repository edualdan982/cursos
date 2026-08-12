import { useState } from "react";
import { GifList } from "./gifs/GifList";
import { PreviousSearches } from "./gifs/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(["dragon ball z"]);

  const handleTermClicked = (term: string) => {
    console.log(term);
  };
  const handleSearch = (query: string) => {
    console.log("handleSearch:", query);
  };

  return (
    <>
      {/* Headers */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto."
      />

      {/* Search */}
      <SearchBar placeholder="Buscar gifs" onQuery={handleSearch} />

      {/* Búsquedas previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Gif */}
      {/* Creer el Componente GifList => Props Gif[]*/}
      <GifList gifs={mockGifs} />
    </>
  );
};
