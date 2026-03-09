import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()" />
    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
  styles: ``,
})
export default class ChangeDetectionComponent {
  public currentFramework =  computed(
    () => `Change detection - ${this.frameworkAsSignal().name}`
  );
  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });
  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: 2017,
  };

  constructor() {
    setTimeout(() => {
      // this.frameworkAsProperty.name = 'React';
      // ? Una forma de asignar y cambiar los datos del valor de la señal
      /*this.frameworkAsSignal.update( value => ({
        ...value, name: 'React'
      }));*/
      this.frameworkAsSignal.update( value => {
        value.name = 'React';
        return {...value}
      });
      console.log('Hecho');
      console.log(`Propiedad cambiada: ${this.frameworkAsProperty.name}`);
    }, 3000);
  }
}
