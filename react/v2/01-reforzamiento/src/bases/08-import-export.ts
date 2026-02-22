import { heroes as misHeroes, Owner, type Hero } from "./data/heroes..data";

const getHeroId = (id: number): Hero | undefined => {
  const hero = misHeroes.find((hero) => {
    return (hero.id = id);
  });
  // if(!hero)
  //   throw new Error(`No existe un hero con el id ${id}`);
  return hero;
};

console.log(getHeroId(7));

/**
 * getHeroresByOwner => Hero[]
 * Filtra héroes por su propietario
 * @param Ownew - El propietario por el cual filtrar (DC o Marvel)
 * @returns Array de héroes pertenecientes al propietario
 */

export const getHeroresByOwner = (ownerParam: Owner) =>
  misHeroes.filter((hero) => hero.owner === ownerParam);

