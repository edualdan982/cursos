import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environments.baseUrl + '/heroes';
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}`);
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/${this.baseUrl}`)
    .pipe(
      catchError(error => of(undefined))
    );
  }

  crearHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.baseUrl, hero);
  }

  eliminarHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this.baseUrl}/${this.baseUrl}`);
  }
}
