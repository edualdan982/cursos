import { Component } from '@angular/core';
import { PlacesService } from '../../services';
import { retry } from 'rxjs';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  constructor(private placesService: PlacesService) {}

  public flyTo(coodinates: number[]) {
    const [lng, lat] = coodinates;
    console.log({ lng, lat });
  }

  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }
}
