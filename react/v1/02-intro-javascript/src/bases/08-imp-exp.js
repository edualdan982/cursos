import heroes from "../data/heroe";

export const getHeroesById = (id) =>
  heroes.find((element) => element.id === id);

export const getHeroesByName = (desc) => {
  return heroes.find((element) => element.name.toLowerCase().includes(desc));
};

export const getHeroesByOwner = (owner) =>
  heroes.find((element) => element.owner.toLowerCase() === owner);

export const getHeroesByOwners = (owner) =>
  heroes.filter((element) => element.owner.toLowerCase() === owner);

// console.log(getHeroesById(2));
// console.log(getHeroesByName("spider"));

// console.log(getHeroesByOwners("marvel"));

// console.log(owners);
