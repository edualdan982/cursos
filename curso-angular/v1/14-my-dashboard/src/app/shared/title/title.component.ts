import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  template: `<h1 class="text-3xl mb-5">{{ title }}</h1>`,
  // exportAs: 'app-title'
})
export class TitleComponent {
  @Input({required: true}) title!: string;
  @Input({transform: booleanAttribute}) withShadow: boolean = false;
}
