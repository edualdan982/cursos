import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  titulo: string = "Por favor Iniciar Sesión: ";
  usuario: Usuario;
  constructor(private authService: AuthService,
    private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal.fire('Sessión: ', `Hola ${this.authService.usuario.username} ya estas autenticado!`,'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    //console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null ||
      this.usuario.username == "" || this.usuario.password == "") {
      swal.fire('Error al iniciar sesion', 'Username o password vacias!', 'error');
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        //console.log(response);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        let usuario = this.authService.usuario;

        this.router.navigate(['/clientes']);
        swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!.`, 'success');
      }, err => {
        if(err.status == 400){
          swal.fire('Error al iniciar sesion', 'Usuario o clave incorrecta!', 'error');
        }
      }
    );
  }
}
