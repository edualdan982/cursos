const { usContext } = require("../../src/base-pruebas/06-deses-obj");

describe("Prueba en 06-deses-obj.js", () => {
  test("Esta prueba debe retornar un objeto", () => {
    const testPersona = {
      nombre: "Tony",
      edad: 45,
      clave: "Ironman",
    };

    const {
      nombreClave,
      anios,
      latlng: { lat, lng },
    } = usContext(testPersona);

    expect(nombreClave).toBe(testPersona.clave);
    expect(anios).toBe(testPersona.edad);
  });
});
