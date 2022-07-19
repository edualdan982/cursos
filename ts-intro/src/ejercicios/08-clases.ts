class PersonaNormal {
  // nombre: string;
  // direccion: string;

  constructor(
    public nombre: string, 
    public direccion: string
    ) {}
}

class Heroe extends PersonaNormal {
  // alterEgo: string;
  // edad: number;
  // nombreReal: string;

  constructor(
    public alterEgo: string,
    public edad: number,
    public nombreReal: string
  ) {
    super(nombreReal, 'New York, USA');
  }
}

const ironMan = new Heroe("IronMan", 45, "Tony Stark");

console.log(ironMan);