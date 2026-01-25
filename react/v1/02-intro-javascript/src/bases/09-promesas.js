import { getHeroesById } from "../bases/08-imp-exp";

// promesa.then((heroe) =>{
//   console.log('Then de la promesa');
//   console.log('heroe',heroe);
// }).catch( err => console.warn(err));

const getHeoreByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("2 segundo despues");

      const p1 = getHeroesById(id);

      if (p1) resolve(p1);
      else reject("No se puedo encontrar el heroe");
    }, 2000);
  });
};


export default getHeoreByIdAsync;
