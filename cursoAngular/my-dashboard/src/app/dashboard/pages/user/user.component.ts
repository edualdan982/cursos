import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/request-response';
import { TitleComponent } from '@shared/title/title.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title title="User" />
    @if (user()) {
    <section>
      <img [srcset]="user()!.avatar" [alt]="user()!.first_name" />
      <div>
        <h3>{{ user()!.first_name }}</h3>
        <p>{{ user()?.email }}</p>
      </div>
    </section>
    }@else {
    <p>Cargando informacion</p>
    }
  `,
})
export default class UserComponent {
  private router = inject(ActivatedRoute);
  private userService = inject(UsersService);

  // public user = signal<User| undefined>(undefined);
  public user = toSignal<User>(
    this.router.params.pipe(
      switchMap(({ id }) => this.userService.getUserById(id))
    )
  );
  constructor() {
    this.router.params.subscribe((params) => console.log(params));
  }
}
