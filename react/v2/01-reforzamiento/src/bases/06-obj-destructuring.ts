const person = {
  name: "Tony",
  age: 45,
  key: "IronMan",
};

const { key, name: ironmanName, age } = person;

// const name = person.name
// const age = person.age
// const key = person.key

console.log({ key, ironmanName, age });

interface Hero {
  name: string;
  age: number;
  key: string;
  rank?: string;
}

const useContext = ({ key, name, age, rank = "sin rango" }: Hero) => {
  return {
    keyName: key,
    user: {
      name,
      age,
    },
    rank: rank,
  };
};

const {
  rank,
  keyName,
  user,
  //   user: { name },
} = useContext(person);

const { name } = user;
console.log({ rank, keyName, name });
