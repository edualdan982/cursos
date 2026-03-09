import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent{
  listaCurso:string[] = ['TypeScript','JavaScript', 'Java SE', 'C#', 'PHP'];
  value: string = "";
  habilitar: boolean = true;

  constructor() { }

  setHabilitar(): void {
    this.habilitar = (this.habilitar == true)? false: true;
  }
  getHabilitar(): string {
    this.value = (this.habilitar == true)? "Ocultar" : "Mostrar";
    return this.value;
  }
}
