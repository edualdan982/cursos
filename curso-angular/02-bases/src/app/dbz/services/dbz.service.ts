import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DbzService {
  public characters: Character[] = [
    { id: uuid(), name: 'Krillin', power: 1000 },
    { id: uuid(), name: 'Goku', power: 5000 },
    { id: uuid(), name: 'Vegeta', power: 7500 },
  ];

  addCharacter(character: Character): void {
    console.log('Recibiendo los datos para agregar el Character.');
    const newCharacter = { id: uuid(), ...character };
    this.characters.push(newCharacter);
  }

  // onDeleteCharacter(index: number): void {
  onDeleteCharacter(id: string) {
    console.log(`Recibiendo el id para eliminar el Character: ${id}`);
    this.characters = this.characters.filter(
      (character) => character.id !== id
    );
  }
}
