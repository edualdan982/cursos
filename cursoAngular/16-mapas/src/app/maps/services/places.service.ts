import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, PlaceResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(private placesApiClient: PlacesApiClient) {
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.error(err);
          reject();
        }
      );
    });
  }
  getPlacesByQuery(query: string = '') {
    // !TODO: evaluar con el query es vacio o nulo

    if (!this.userLocation) throw Error('No hay userLocation');
    this.isLoadingPlaces = false;
    this.placesApiClient
      .get<PlaceResponse>('', {
        params: {
          q: query,
          proximity: this.userLocation?.join(','),
        },
      })
      .subscribe((resp) => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
  }
}
