import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifList, setGifsList] = useState<Gif[]>([]);

  const handleTermClicked = (term: string) => {
    console.log(term);
  };
  const handleSearch = async (query: string = "") => {
    query = query.trim().toLowerCase();

    if (query.length === 0) {
      console.warn("El valor a buscar no puede ser nulo.");
      return;
    }
    if (previousTerms.includes(query)) return;

    setPreviousTerms([query, ...previousTerms].slice(0, 7));

    const gifs = await getGifsByQuery(query);

    setGifsList(gifs);
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
      <GifList gifs={gifList} />
    </>
  );
};
