describe("Pruebas en <DemoComponent/>", () => {
  test("Esta prueba no debe de fallar", () => {
    //Existen 3 pasos de las pruebas:
    //  1. inicialización
    const message1 = "Hola Mundo";
    //  2. estimulo
    const message2 = message1.trim();
    //  3. Observar el comportamiento... esperando

    expect(message1).toBe(message2);
  });
});
