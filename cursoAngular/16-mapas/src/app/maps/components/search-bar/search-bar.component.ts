import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;
  constructor(private placesService: PlacesService) {}

  onQueryChanged(query: string) {
    console.log(`Valor del query: ${query}`);

    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      console.log('Mandar este Query', query);
      this.placesService.getPlacesByQuery(query);
    }, 1000);
  }
}
