import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'productos-order',
  templateUrl: './order.component.html',
  styles:[]
})
export class OrderComponent {
  public items: MenuItem[] = [{item: 'Actulizar'}, {item: 'Eliminar'}];


}
