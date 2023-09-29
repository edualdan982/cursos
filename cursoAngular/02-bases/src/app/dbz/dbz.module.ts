import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page-component';
import { ListComponent } from './components/list/list.component';
import { CharacterComponent } from './components/character/character.component';
import { AddCharacterComponent } from './components/add-character/add-character.component';

@NgModule({
  declarations: [MainPageComponent, ListComponent, CharacterComponent, AddCharacterComponent],
  imports: [CommonModule],
  exports: [MainPageComponent],
})
export class DbzModule {}
