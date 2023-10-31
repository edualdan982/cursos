import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europa',
    'Oceania',
  ];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
    this.countries = this.countriesService.cacheStore.byRegion.countries;
  }

  searchByRegion(value: Region) {
    this.isLoading = true;
    this.selectedRegion = value;
    this.countriesService.searchRegion(value).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
