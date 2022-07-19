import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service'
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title: string = 'App Angular';
  constructor(
    private _authService: AuthService,
    private router: Router) { }


  public get authService(): AuthService{
    return this._authService;
  }
  logout() {
    let username = this._authService.usuario.username;
    this._authService.logout();
    swal.fire('LogOut', `Hola ${username}, has cerrado sesión con éxito.`, 'success');
    this.router.navigate(['/login']);
  }

}
