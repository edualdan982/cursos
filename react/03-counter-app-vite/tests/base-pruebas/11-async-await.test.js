const { getImagen } = require("../../src/base-pruebas/11-async-await");

describe("Pruebas en 11-async-await", () => {

  test("getImagen debe retornar la URL de la images", async () => {
    const url = await getImagen();
    console.log(url);
    expect(typeof url).toBe("string");
  });

  test("getImagen debe retornar la URL de la images", async () => {
    const url = await getImagen();
    console.log(url);
    expect(typeof url).toBe("string");
  });
});
