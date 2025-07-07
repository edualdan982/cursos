import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  title: string = 'Contador usando Redux';
  counter: number;

  constructor() {
    this.counter = 0;
  }

  increment() {
    console.log('Incrementar contador');
    this.counter++;
  }
  decrement() {
    console.log('Decrementar contador');
    this.counter--;
  }
  reset() {
    console.log('Reiniciar contador');
    this.counter = 0;
  }
}
