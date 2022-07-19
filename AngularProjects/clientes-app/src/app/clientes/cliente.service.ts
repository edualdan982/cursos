import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Region } from './region';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = "http://localhost:2003/api/clientes";

  //private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones').pipe();
  }
  getClienteService(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page' + "/" + page).pipe(
      tap((response: any) => {
      //  console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          //console.log(cliente.nombre);
        })
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM, yyyy');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        //console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => {
        //  console.log(cliente.nombre);
        })
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
    /*  return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.log(e.error.mensaje, e.error.status);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );*/
  }

  Foto(archivo: File, id: any): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req).pipe();
  }

  /*
  Este metodo se hizo sin http Interceptors
  Foto(archivo: File, id: any): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });
    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  */

  /*
    private agregarAuthorizationHeader() {
      let token = this.authService.token;
      if(token != null){
        return this.httpHeaders.append('Authorization', 'Bearer ' + token);
      }
      return this.httpHeaders;
      Este memtodo es para implementara cada uno de los metodos que reciben algo del servidor
      private isNoAutorizado(e): boolean {
        if (e.status == 401) {
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          this.router.navigate(['/login']);
          return true;
        }
        if (e.status == 403) {
          this.router.navigate(['/clientes']);
          swal.fire('Acceso Denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
          return true;
        }
        return false;
      }
    }*/

}
