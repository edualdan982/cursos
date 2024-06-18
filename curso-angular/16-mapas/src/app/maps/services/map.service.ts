import { Injectable } from '@angular/core';
import {
  AnySourceData,
  LineLayer,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/direcctions';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map | undefined;
  private markers: Marker[] = [];

  constructor(private directionsApiClient: DirectionsApiClient) {}

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
  createMarkersFromPlaces(places: Feature[], userLocation: LngLatLike) {
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

    if (places.length === 0) return;
    // Limites del Mapa
    const bounds = new LngLatBounds();
    newMarkers.forEach((marker) => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200,
    });
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    const pathRuta: string = `${start.join('%2C')}%3B${end.join('%2C')}`;
    console.log(`${pathRuta}`);
    this.directionsApiClient.get<DirectionsResponse>(pathRuta).subscribe({
      next: (resp) => {
        console.log(resp.routes);
        console.log(this.map?.getSource('route'));
        this.drawPolyline(resp.routes[0]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private drawPolyline(route: Route) {
    console.log({ kms: route.distance / 1000, duration: route.duration / 60 });

    if (!this.map) throw Error('Mapa no inicializado');

    // Primero que nada debemos enfoncar el mapa con el punto final, para que al trazar la polyline esta puede verse correctamente
    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => bounds.extend([lng, lat]));

    this.map?.fitBounds(bounds, {
      padding: 200,
    });

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
            properties: {},
          },
        ],
      },
    };

    // !TODO: Limpiar la ruta previa
    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }
    // Aqui se debe agregar un nuevo id que debe ser unico
    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3,
      },
    });
  }
}
