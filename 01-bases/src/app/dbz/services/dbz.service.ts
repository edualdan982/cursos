import { Injectable } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

@Injectable()
export class DbzService{
  personajes: Personaje[] = [
    {
      nombre: 'Goku',
      poder: 1500,
    },
    {
      nombre: 'Vegeta',
      poder: 7500,
    },
  ];


  constructor() {
    console.log("Servicio inicializado");
  }
}