//funcion anomina no invicada
( () => {
  // class Avenger {
  //   nombre: string;
  //   equipo: string;
  //   nombreReal: string;
  //   puedePelear: boolean;
  //   peleasGanadas: number;
    
  //   constructor(nombre: string, equipo: string) {
  //     this.nombre = nombre;
  //     this.equipo = equipo;
  //     // this.nombreReal = nombreReal;
  //     // this.puedePelear = puedePelear;
  //     // this.peleasGanadas= peleasGanadas:
  //   }
  // }
  // const antMan = new Avenger('AntMan', 'Capitan');
  // console.log(antMan);
    class Avenger {
      // nombre: string;
      // equipo: string;
      // nombreReal: string;
      // puedePelear: boolean;
      // peleasGanadas: number;

      constructor(
        public nombre: string,
        public equipo: string,
        public nombreReal?: string,
        public puedePelear: boolean = true,
        public peleasGanadas: number = 0
      ) {}
    }
    const antMan = new Avenger('AntMan', 'Capi');
    console.log(antMan);
})();