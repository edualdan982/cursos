const { render, screen } = require("@testing-library/react");
const { GifGrid } = require("../../src/components");
const { useFetchGifs } = require("../../src/hooks/useFetchGifs");

// Este es para crear un mock completo de useFetchGifs
jest.mock("../../src/hooks/useFetchGifs");

describe("Prueba en <GifGrid/>", () => {
  const category = "One Punch";

  test("debe mostrar el loading inicialmente", () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);
    // screen.debug();
    expect(screen.getByText("Cargando...")).toBeTruthy();
  });

  test("debe mostrar items cuando se cargar las imágenes useFetchGifs", () => {
    const gifs = [
      {
        id: "ABC",
        title: "Saitama",
        url: "https://prueba.saitama.jpg",
      },
      {
        id: "123",
        title: "Goku",
        url: "https://prueba.goku.jpg",
      },
      {
        id: "GFD",
        title: "ben 10",
        url: "https://prueba.ben10.jpg",
      },
    ];

    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false,
    });

    render(<GifGrid category={category} />);

    // screen.debug();

    expect(screen.getAllByRole("img").length).toBe(gifs.length);
  });
});
