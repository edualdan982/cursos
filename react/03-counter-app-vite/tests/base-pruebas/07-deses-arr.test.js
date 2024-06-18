const { retornaArreglo } = require("../../src/base-pruebas/07-deses-arr")

describe('Prueba en 07-deses-arr', () => { 
  test('Debe retornar un String y numeros', () => { 
    const [letters, numbers] = retornaArreglo();
    
    // expect(letters).toBe('ABC');
    // expect(numbers).toBe(123);

    expect(typeof letters).toBe('string');
    expect(typeof numbers).toBe('number');

    expect(letters).toEqual(expect.any(String));
    expect(numbers).toEqual(expect.any(Number));

   })
 })