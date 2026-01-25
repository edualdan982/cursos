const { renderHook, waitFor } = require("@testing-library/react");
const { useFetchGifs } = require("../../src/hooks/useFetchGifs");

describe("Pruebas en custom-hook useFetchGifs", () => {
  test("debe regregar el estado inicial", () => {
    const { result } = renderHook(() => useFetchGifs("One Punch"));

    const { images, isLoading } = result.current;

    expect(images.length).toBe(0);
    expect(isLoading).toBeTruthy();
  });

  test("debe retornar un arreglo de imagenes y el isLoading en false", async () => {
    const { result } = renderHook(() => useFetchGifs("One Punch"));

    await waitFor(() =>
      expect(result.current.images.length).toBeGreaterThan(0),
    );
    const { images, isLoading } = result.current;

    expect(images.length).toBeGreaterThan(0);
    expect(isLoading).toBeFalsy();
  });
});
