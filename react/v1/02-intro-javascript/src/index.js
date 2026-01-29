import { getHeroesById } from "./bases/08-imp-exp";

const getHeroesByIdAsync = (id) => {
  const promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      //Tarea
      const heroe = getHeroesById(id);
      if (heroe) resolve(heroe);
      else reject("No se ha encontrado el héroe.");
    }, 2000);
  });
  return promesa;
};

getHeroesByIdAsync(1)
  .then(console.log)
  .catch(console.warn);
