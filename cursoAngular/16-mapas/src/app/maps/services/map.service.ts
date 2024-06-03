import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map | undefined;

  constructor() {}

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no esta listo');

    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }
}
