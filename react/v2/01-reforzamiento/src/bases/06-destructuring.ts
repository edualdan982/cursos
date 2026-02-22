const person = {
  name: "Tony",
  age: 45,
  key: "IronMan",
};
const { name, age, key } = person;

console.log({ name, age, key });


interface Hero {
    name: string;
    age: number;
    key: string; 
    rank?: string
}

const useContext = ({key, name, age, rank}: Hero) =>{

  return{
    keyName: key,
    user:{
      name, age
    },
    rank: rank
  }
};

const context = useContext(person);

console.log(context)