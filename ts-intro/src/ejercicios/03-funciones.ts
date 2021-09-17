/*
    ===== Código de TypeScript =====
*/
/*
    ===== Código de TypeScript =====
*/
function sumar1(a: number, b: number): number{
    return (a + b);
}

const sumarFlecha1 = (a: number, b: number): number => {
    return a + b;
}

function multiplicar1(numero: number, base: number, otroNumero?: number): number{
    return numero * base;
}
const resultado1 = sumar1(5, 6);
const resultMult1 = multiplicar1(5, 10);

console.log(resultado1);
console.log(resultMult1);

interface PersonajeLOR {
    nombre: string;
    pv: number;
    mostrarHp: () => void;
}

function curar(personaje: PersonajeLOR, curarX: number): void {
  personaje.pv += curarX;
}

const nuevoPersonaje: PersonajeLOR = {
    nombre: 'Edual Dan',
    pv: 50,
    mostrarHp() {
        console.log('Puntos de vida: ', this.pv);
    }
};

curar(nuevoPersonaje, 50);

nuevoPersonaje.mostrarHp();
