const { getUser, getUsuarioActivo } = require("../../src/base-pruebas/05-funciones")

describe('Prueba en 05-funciones', () => { 
  test('getUser debe retornar un objeto', () => {
      const testUser = { uid: 'ABC123', username: 'El_Papi1502'}; 
      
      const user = getUser();

      expect(user).toEqual(testUser);

   })
   
   test('getUsuarioActivo debe retornar un objeto ', () => { 
      const nombre = 'Fernando';
      const usuarioActivo = getUsuarioActivo(nombre);

      const testUsuario = { uid: 'ABC567', username: 'Fernando'};

      expect(usuarioActivo).toStrictEqual(testUsuario);

    })
 })