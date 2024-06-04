import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { map } from 'rxjs';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map | undefined;
  private markers: Marker[] = [];

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
      center: coords,
      zoom: 14,
    });
  }
  createMarkersFromPlaces(places: Feature[]) {
    if (!this.map) throw Error('Mapa no inicializado');

    this.markers.forEach((marker) => marker.remove());
    const newMarkers = [];
    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates;
      const popup = new Popup().setHTML(`
          <h6>${place.properties.name}</h6>
          <span>${place.properties.place_formatted}</span>
        `);
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
    }
    this.markers = newMarkers;

    if ((places.length = 0)) return;
    // Limites del Mapa
    const bounds = new LngLatBounds();
    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));

    this.map.fitBounds(bounds);
  }
}
