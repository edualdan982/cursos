const {
  getHeroeById,
  getHeroesByOwner,
} = require("../../src/base-pruebas/08-imp-exp");

describe("Prueba en 08-imp-exp", () => {
  test("getHeroeById debe retornar un héroe por ID", () => {
    const id = 1;
    const hero = getHeroeById(id);

    expect(hero).toEqual({ id: 1, name: "Batman", owner: "DC" });
  });

  test("getHeroeById debe retornar undefined si no existe el héroe", () => {
    const id = 100;
    const hero = getHeroeById(id);

    expect(hero).toBeFalsy();
  });

  // Tarea
  // Debe retornar un arreglo con los hérores de DC
  // Longitud === 3
  // Debe retornar el arreglo filtrado

  test("getHeroesByOwner debe retornar todos los Hérores de DC", () => {
    const owner = "DC";
    const heroes = getHeroesByOwner(owner);

    const testHeroes = [
      {
        id: 1,
        name: "Batman",
        owner: "DC",
      },
      {
        id: 3,
        name: "Superman",
        owner: "DC",
      },
      {
        id: 4,
        name: "Flash",
        owner: "DC",
      },
    ];
    expect(heroes.length).toBe(3);
    expect(heroes).toEqual(testHeroes);
  });
  //  Debe retornar un arreglo con los héroes de Marvel
  //  Longitud === 2
  test("getHeroesByOwner debe retornar todos los Hérores de Marvel", () => {
    const owner = "Marvel";
    const heroes = getHeroesByOwner(owner);

    const testHeroes = [
      {
        id: 2,
        name: "Spiderman",
        owner: "Marvel",
      },
      {
        id: 5,
        name: "Wolverine",
        owner: "Marvel",
      },
    ];
    expect(heroes.length).toBe(2);
    expect(heroes).toEqual(testHeroes);
  });
});
