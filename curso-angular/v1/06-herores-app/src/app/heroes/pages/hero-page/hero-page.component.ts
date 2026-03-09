import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [],
})
export class HeroPageComponent implements OnInit {
  public hero!: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        // delay(3000),
        switchMap((params) => this.heroesService.getHeroById(params['id'])))
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/heroes/list']);
        this.hero = hero;
        console.log(hero);
        return;
      });
  }

  goBack(){
    this.router.navigateByUrl('heroes/list');
  }
}
