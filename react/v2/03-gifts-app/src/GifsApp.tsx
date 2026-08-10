import { useState } from "react";
import { GifList } from "./gifs/GifList";
import { PreviousSearches } from "./gifs/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchHeader } from "./shared/components/SearchHeader";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(["dragon ball z"]);

  const handleTermClicked = (term: string) => {
    console.log(term);
  };
  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <>
      {/* Headers */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto."
      />

      {/* Search */}
      <SearchHeader placeholder="Buscar gifs" onQuery={handleSearch} />

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
