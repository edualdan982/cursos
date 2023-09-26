//funcion anomina no invicada
( () => {
  interface Xmen {
    nombre: string,
    edad: number,
    poder?: string;
  }
  const enviarMission = ( xmen: { nombre: string } ) => {
    console.log(`Enviando a ${xmen.nombre} a la misión.`);
  }
  const regresarAlCuartel = (xmen: { nombre: string }) => {
    console.log(`Enviando a ${xmen.nombre} al cuartel.`);
  };
  const wolverine: Xmen = {
    nombre: 'Logan',
    edad: 60,
  };
  enviarMission(wolverine);
  regresarAlCuartel(wolverine);
})();