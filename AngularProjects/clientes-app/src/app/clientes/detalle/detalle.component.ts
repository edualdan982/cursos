import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';

import swal from 'sweetalert2';

import {HttpEventType} from '@angular/common/http';
import { AuthService } from '../../usuarios/auth.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = "Detalle del Cliente";
  nombreFoto:string = "Seleccione una imagen";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private clienteServie: ClienteService,
    private modalService: ModalService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    /* Ya se le puso el decorador input que remplaza a esto
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = + params.get('id');
      if (id) {
        this.clienteServie.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        })
      }
    });*/
  }
  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    this.progreso = 0;
    if(this.fotoSeleccionada.type.indexOf('image')<0){
      swal.fire('Error al seleccionar Imagen: ', 'El archivo de ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
      this.nombreFoto = "Selecciones una imagen";
    }else {
      this.nombreFoto = this.fotoSeleccionada.name;
    }
  }
  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    }
    else {
      this.nombreFoto = "Selecciones una imagen";
      this.clienteServie.Foto(this.fotoSeleccionada, this.cliente.id)
        .subscribe( event => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100);
          } else if (event.type === HttpEventType.Response){
            let response: any = event.body;
            this.cliente = response.cliente;

            this.modalService.notificarUpload.emit(this.cliente);
            swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        }

        );
    }
  }
  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada=null;
    this.progreso = 0;
  }

  getModalValid(): boolean{
    if(this.modalService.modal)
      return true;
    else
      return false
  }
  public get authService(): AuthService {
    return this._authService;
  }
}
