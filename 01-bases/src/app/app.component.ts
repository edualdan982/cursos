import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<span>Hola Mundo Edual</span>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public titulo: string = 'Contador App';
  public numero: number = 0;

  public agregarContador(): void {
    this.numero++;
  }

  public restarContador(): void {
    this.numero--;
  }

  public sumar(valor: number): void {
    this.numero = this.numero + valor;
  }
}
