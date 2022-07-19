import { Component, OnInit, OnChanges } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';

import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

import { tap } from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private _authService: AuthService) { }
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      this.clienteService.getClienteService(page)
        .pipe(
          tap((response: any) => {
            //console.log('ClientesComponent: tap 3');
            (response.content as Cliente[]).forEach(cliente => {
              //console.log(cliente.nombre);
            });
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    }
    );
    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    });
  }

  delete(cliente: Cliente) {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
      width: 600,
      padding: '3em',
      background: '#fff url(assets/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("assets/images/nyan-cat.gif")
        left top
        no-repeat`
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `El Cliente ${cliente.nombre} eliminado con exito.`,
              'success'
            )
          }
        );

      }
    });
  }

  gatito(): void {
    swal.fire({
      title: 'Muy chevere el gatito',
      width: 600,
      padding: '3em',
      background: '#fff url(assets/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("assets/images/nyan-cat.gif")
        left top
        no-repeat
      `
    })
  }
  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

  public get authService(): AuthService{
    return this._authService;
  }
}
