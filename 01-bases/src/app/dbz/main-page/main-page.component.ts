import { Component } from '@angular/core';

interface Personaje{
  nombre: string;
  poder: number;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  nuevo: Personaje = {
    nombre: 'Trunks',
    poder: 140000
  }
  agregar( ){
    console.log('Esta es una prueba');
  }

  cambiarNombre(event: any){
    console.log(event.target.value);
  }

  // agregar( event: any){
  //   event.preventDefault();
  //   console.log('Hey...!!!');
  // }
}
