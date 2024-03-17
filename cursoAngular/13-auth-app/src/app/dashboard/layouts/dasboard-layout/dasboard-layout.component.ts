import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dasboard-layout.component.html',
  styleUrls: ['./dasboard-layout.component.css'],
})
export class DasboardLayoutComponent {
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());


  /* getUser() {
    return this.authService.currentUser();
  } */
}
