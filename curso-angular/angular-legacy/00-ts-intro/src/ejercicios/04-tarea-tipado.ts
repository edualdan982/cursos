/*
    ===== Código de TypeScript =====
*/
interface Direccion {
    calle: string;
    pais: string;
    cuidad: string;
}

interface SuperHeroe {
    nombre: string;
    edad: number;
    direccion: Direccion;
    mostrarDireccion: () => string;
}

const superHeroe = {
    nombre: 'Spiderman',
    edad: 30,
    direccion: {
        calle: 'Main St',
        pais: 'USA',
        cuidad: 'NY'
    },
    mostrarDireccion() {
        return this.nombre + ', ' + this.direccion.cuidad + ', '+ this.direccion.pais;
    }
}
 const direccion = superHeroe.mostrarDireccion();
 console.log(direccion);