import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  public selectedId: string = '';

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) {}

  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  public flyTo(feature: Feature) {
    this.selectedId = feature.id;
    const [lng, lat] = feature.geometry.coordinates;
    console.log({ lng, lat });
    this.mapService.flyTo([lng, lat]);
    this.mapService.getRouteBetweenPoints(
      this.placesService.userLocation!,
      [lng, lat]
    );
  }

  getDirections(place: Feature){
    if(!this.placesService.userLocation) throw Error('No hay userLocation');

    this.placesService.deletePlaces();

    const start = this.placesService.userLocation as [number, number];
    const end = place.geometry.coordinates as [number, number];
    this.mapService.getRouteBetweenPoints(start, end);


  }
}
