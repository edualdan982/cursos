import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { Observable, catchError, of, pipe, map } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environments.baseUrl + '/heroes';
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  eliminarHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this.baseUrl}`);
  }

  getSuggestions(query: string, limit?: number): Observable<Hero[]> {
    if (!limit) return this.http.get<Hero[]>(`${this.baseUrl}?q=${query}`);
    else
      return this.http.get<Hero[]>(
        `${this.baseUrl}?q=${query}&_limit=${limit}`
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.baseUrl, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}`, hero);
  }

  deleteById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => of(false)),
      map((resp) => true)
    );
  }
}
