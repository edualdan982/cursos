import { Country } from './../../../../../04-country-app/src/app/countries/interfaces/country';
import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private BASE_URL = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  constructor(private http: HttpClient) {}

  get regions(): Region[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    return this.http
      .get<Country[]>(
        `${this.BASE_URL}/region/${region}?fields=cca3,name,borders`
      )
      .pipe(
        map((countries) => {
          return countries.map((country) => ({
            name: country.name.common,
            cca3: country.cca3,
            borders: country.borders ?? [],
          }));
        }),
        tap((response) => {
          console.log(response);
        })
      );
  }

  getCountryByAlfaCode(cca3: string): Observable<SmallCountry> {
    return this.http
      .get<Country>(`${this.BASE_URL}/alpha/${cca3}?fields=cca3,name,borders`)
      .pipe(
        map((country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      );
  }

  getCountriesBorderByCodes(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    const countriesRequest: Observable<SmallCountry>[] = [];

    borders.forEach((code) => {
      const request = this.getCountryByAlfaCode(code);
      countriesRequest.push(request);
    });

    return combineLatest(countriesRequest);
  }
}
