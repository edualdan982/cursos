import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrls: ['./uncommon-page.component.css'],
})
export class UncommonPageComponent {
  // i18n Select
  public name: string = 'Edual Dan';
  public gender: 'male' | 'female' = 'male';
  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient(): void {
    this.name = 'Melisa';
    this.gender = 'female';
  }

  // i18n Plural
  public clients: string[] = [
    'Maria',
    'Pedro',
    'Juan',
    'Natalia',
    'Fernando',
    'Roberto',
  ];
  public clientsMap = {
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando.',
  };
  deleteClient(): void {
    this.clients.shift();
  }

  // Keyvalue Pipe
  public person = {
    name: 'Edual',
    age: 25,
    address: 'El Alto, Bolivia',
  };

  // Async Pipe
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap((value) => console.log('tap: ', value))
  );

  public promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos datos en la promesa');
      console.log('Tenemos datos en la promesa');
      this.person.name = 'Dan';
    }, 3500);
  });
}
