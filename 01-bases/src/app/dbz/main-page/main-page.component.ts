import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  nuevo: Personaje = {
    nombre: '',
    poder: 0,
  };

  cambiarNombre(event: any) {
    console.log(event.target.value);
  }

  agregarNuevoPersonaje(personaje: Personaje) {
    console.log('Main page component');
    console.log(personaje);
    // debugger;
    this.personajes.push(personaje);
  }
  get personajes(): Personaje[] {
    return this.dbzService.personajes;
  }
  // agregar( event: any){
  //   event.preventDefault();
  //   console.log('Hey...!!!');
  // }

  constructor(private dbzService: DbzService) {}
}
