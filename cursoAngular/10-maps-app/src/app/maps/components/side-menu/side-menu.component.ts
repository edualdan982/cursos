import { Component } from '@angular/core';
import { routes } from '../../../../../../08-selectores/src/app/countries/countries-routing.module';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'Full-Screen'},
    { route: '/maps/zoom-page', name: 'Zoom-Range'},
    { route: '/maps/markers', name: 'Markers'},
    { route: '/maps/properties', name: 'House'},
  ];
}
