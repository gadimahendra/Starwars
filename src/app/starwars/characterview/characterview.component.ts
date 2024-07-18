import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
// import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-characterview',
  templateUrl: './characterview.component.html',
  styleUrls: ['./characterview.component.scss'],
})
export class CharacterviewComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private _service: MovieService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  initials: any = '';
  character: any = {};
  id: any = '';
  ngOnInit(): void {
    this.spinner.show();
    this.activeRoute.params.subscribe((param: any) => {
      this.id = param['id'];
      this.getCharacterById(param['id']);
    });
  }

  characterFilms: any = [];
  vechicles: any = [];
  starships: any = [];
  getCharacterById(id: any) {
    this._service.getPersonById(id).subscribe(
      (res: any) => {
        this.character = res;
        let nameArray = res?.name?.split(' ');
        if (res.name.includes('-')) {
          nameArray = res?.name?.split('-');
        }
        this.initials = nameArray[0]?.charAt(0) + nameArray[1]?.charAt(0);
        if (res.films.length > 0) {
          const filmObservables = res.films.map((url: any) =>
            this._service.getStarwarsHomepage(url)
          );
          forkJoin(filmObservables).subscribe((films: any) => {
            this.characterFilms = films;
          });
        }
        if (res.vehicles.length > 0) {
          const filmObservables = res.vehicles.map((url: any) =>
            this._service.getStarwarsHomepage(url)
          );
          forkJoin(filmObservables).subscribe((vechicles: any) => {
            this.vechicles = vechicles;
          });
        }
        if (res.starships.length > 0) {
          const filmObservables = res.starships.map((url: any) =>
            this._service.getStarwarsHomepage(url)
          );
          forkJoin(filmObservables).subscribe((ships: any) => {
            this.starships = ships;
          });
        }
        this.spinner.hide();
      },
      (err: any) => {
        this.spinner.hide();
      }
    );
  }

  navigateToHomePage() {
    this.router.navigateByUrl('/');
  }
}
