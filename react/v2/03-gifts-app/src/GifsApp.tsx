import { GifList } from "./gifs/GifList";
import { PreviousSearches } from "./gifs/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchHeader } from "./shared/components/SearchHeader";


export const GifsApp = () => {
  return (
    <>
      {/* Headers */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto."
      />

      {/* Search */}
      <SearchHeader placeholder="Buscar gifs" />

      {/* Búsquedas previas */}
      <PreviousSearches searches={['Roku', 'Sarama', 'Dragon Ball Z']} />

      {/* Gif */}
      {/* Creer el Componente GifList => Props Gif[]*/}
      <GifList gifs={mockGifs} />
    </>
  );
};
