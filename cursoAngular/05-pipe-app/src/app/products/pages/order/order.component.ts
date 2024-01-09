import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'productos-order',
  templateUrl: './order.component.html',
  styles:[]
})
export class OrderComponent {
  public items: MenuItem[] = [
    {label: 'Agregar', icon: 'pi pi-plus'},
    {label: 'Imprimir', icon: 'pi pi-print'},
    {label: 'Eliminar', icon: 'pi pi-trash'},
  ];


}
