
interface Da {
  idDa: number;
  sigla: string;
  nombre: string;
}

const getDas = (gestion: number): Promise<Da| string> => {
  return new Promise((resolve, reject) => {
    console.log({gestion})
    setTimeout(() => {
      const exito = true;
      if (exito) {
        resolve({ idDa: 1, sigla: "01", nombre: "da" });
      } else {
        resolve("No se puede listar la da");
      }
    }, 2000);
  });
};

getDas(2025).then( resp => console.log("Resultado: ", resp))
.catch( console.error)

console.log("Tarea ejetandose.");
