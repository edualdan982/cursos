import { Component } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent {
  heroes: string[] = ['Spiderman', 'Ironman', 'Hulk', 'Thor', 'Capitan'];
  heroesBorrado: string[] = [];
  heroeBorrado: string = '';
  borrarUltimoHerore(): void {
    this.heroes.pop();
  }

  borrarHerore(): void {
    if (this.heroes.length > 0) {
      // El metodo shift() puede devolver un elemento string | undifind
      // Opcion 1:
      // this.heroeBorrado = this.heroes.shift()!;
      // Opcion 2:
      this.heroeBorrado = this.heroes.shift() || '';

      this.heroesBorrado.push(this.heroeBorrado);
    }
  }

  restaurarHeroes(): void {
    this.heroesBorrado.map((heroe) => this.heroes.push(heroe));
  }
}
