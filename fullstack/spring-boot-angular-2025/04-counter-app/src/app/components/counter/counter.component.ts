import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../../store/item.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  title: string = 'Contador usando Redux';
  counter: number = 0;

  constructor(private store: Store<{ counter: number }>) {
    // this.counter = 0;
    this.store.select('counter').subscribe((counter) => {
      this.counter = counter;
    });
  }

  increment() {
    console.log('Incrementar contador');
    // this.counter++;
    this.store.dispatch(increment());
  }
  decrement() {
    console.log('Decrementar contador');
    // this.counter--;
    this.store.dispatch(decrement());
  }
  reset() {
    console.log('Reiniciar contador');
    // this.counter = 0;
    this.store.dispatch(reset());
  }
}
