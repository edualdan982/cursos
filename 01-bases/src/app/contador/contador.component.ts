import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  template: `
    <h1>Hola mundo</h1>
    <h1>{{ titulo }}</h1>

    <h3>
      La base es: <strong> {{ base }} </strong>
    </h3>
    <button (click)="sumar(-base)">-{{ base }}</button>
    <span>{{ numero }}</span>

    <button (click)="sumar()">+{{ base }}</button>
  `,
})
export class ContadorComponent {
  public titulo: string = 'Contador App';
  public numero: number = 0;

  base: number = 5;
  public agregarContador(): void {
    this.numero++;
  }

  public restarContador(): void {
    this.numero--;
  }

  public sumar(valor: number = this.base): void {
    this.numero = this.numero + valor;
  }
}
