import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  peopleApi: string = 'https://swapi.dev/api/people';
  people: any = [];
  paginatedPeople: any[] = []; // Characters for the current page
  pageSize = 10; // Number of characters per page
  pageIndex = 0; // Current page index
  totalPages = 0; // Total number of pages
  totalPagesArray: any = [];
  visiblePages: number[] = [];

  constructor(
    private _service: MovieService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getStarwarsHomePage();
  }

  getStarwarsHomePage() {
    this._service.getStarwarsHomepage(this.peopleApi).subscribe(
      (res: any) => {
        this.people = this.people.concat(res.results);
        this.totalPages = Math.ceil(this.people.length / this.pageSize);
        this.totalPagesArray = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
        this.updateVisiblePages();
        this.paginateCharacters();
        if (res.next) {
          this.spinner.show();
          this.peopleApi = res.next;
          this.getStarwarsHomePage();
        }
        this.spinner.hide();
      },
      (err: any) => {
        this.spinner.hide();
      }
    );
  }

  paginateCharacters(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPeople = this.people.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updateVisiblePages();
      this.paginateCharacters();
    }
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.updateVisiblePages();
      this.paginateCharacters();
    }
  }

  goToPage(page: number): void {
    this.pageIndex = page;
    this.updateVisiblePages();
    this.paginateCharacters();
  }

  updateVisiblePages(): void {
    const maxVisiblePages = 3; // Maximum number of page numbers to display
    let start = Math.max(0, this.pageIndex - 1);
    let end = Math.min(this.totalPages, start + maxVisiblePages);

    if (end - start < maxVisiblePages) {
      start = Math.max(0, end - maxVisiblePages);
    }

    this.visiblePages = [];
    for (let i = start; i < end; i++) {
      this.visiblePages.push(i);
    }
  }

  filmsFilterArray: any = [];
  speciesFilterArray: any = [];
  vehiclesFilterArray: any = [];
  starshipsFilterArray: any = [];
  minBirthYear: any = '';
  maxBirthYear: any = '';
  onSelectOption(event: any, type: string) {
    if (type == 'films') {
      this.filmsFilterArray = [];
      event.forEach((film: any) => {
        let splitUrl = film.url.split('/');
        let filmId = splitUrl[splitUrl.length - 2];
        this.filmsFilterArray.push(filmId);
      });
    }

    if (type == 'species') {
      this.speciesFilterArray = [];
      event.forEach((species: any) => {
        let splitUrl = species.url.split('/');
        let specId = splitUrl[splitUrl.length - 2];
        this.speciesFilterArray.push(specId);
      });
    }

    if (type == 'vehicles') {
      this.vehiclesFilterArray = [];
      event.forEach((vehicles: any) => {
        let splitUrl = vehicles.url.split('/');
        let vechId = splitUrl[splitUrl.length - 2];
        this.vehiclesFilterArray.push(vechId);
      });
    }

    if (type == 'starships') {
      this.starshipsFilterArray = [];
      event.forEach((ships: any) => {
        let splitUrl = ships.url.split('/');
        let shipId = splitUrl[splitUrl.length - 2];
        this.starshipsFilterArray.push(shipId);
      });
    }

    if (type == 'birthYear') {
      let birthYears = event[0].name.split('-');
      this.minBirthYear = birthYears[0];
      this.maxBirthYear = birthYears[1];
    }
  }

  filterApplied: boolean = false;
  searchFilter() {
    if (
      this.filmsFilterArray.length > 0 ||
      this.speciesFilterArray.length > 0 ||
      this.vehiclesFilterArray.length > 0 ||
      this.starshipsFilterArray.length > 0
    ) {
      this.filterApplied = true;
      this.applyFiltersOnPeopleArray();
    }
  }

  checkDisableFun() {
    if (
      this.filmsFilterArray.length > 0 ||
      this.speciesFilterArray.length > 0 ||
      this.vehiclesFilterArray.length > 0 ||
      this.starshipsFilterArray.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }
  clearFilter() {
    this.filterApplied = false;
    this.filmsFilterArray = [];
    this.speciesFilterArray = [];
    this.vehiclesFilterArray = [];
    this.starshipsFilterArray = [];
  }

  extractNumericPart(birthYear: string): number {
    // Extract numeric part of the birth year
    let numericPart = parseFloat(birthYear); // Extract numeric part of the birth year
    return isNaN(numericPart) ? 0 : numericPart;
  }

  filteredPeopleData: any = [];
  applyFiltersOnPeopleArray() {
    this.filteredPeopleData = [];
    this.filteredPeopleData = this.people.filter((char: any) => {
      let matchesFilms = true;
      let matchesSpecies = true;
      let matvhvehicles = true;
      let matchstarShips = true;
      let matchesBirthYear = true;
      if (this.filmsFilterArray.length > 0) {
        matchesFilms = char.films.some((fil: any) => {
          let splitId = fil.split('/');
          let filmId = splitId[splitId.length - 2];
          return this.filmsFilterArray.includes(filmId);
        });
      }

      if (this.speciesFilterArray.length > 0) {
        matchesSpecies = char.species.some((spec: any) => {
          let splitId = spec.split('/');
          let specId = splitId[splitId.length - 2];
          return this.speciesFilterArray.includes(specId);
        });
      }

      if (this.vehiclesFilterArray.length > 0) {
        matvhvehicles = char.vehicles.some((vech: any) => {
          let splitId = vech.split('/');
          let vechId = splitId[splitId.length - 2];
          return this.vehiclesFilterArray.includes(vechId);
        });
      }

      if (this.starshipsFilterArray.length > 0) {
        matchstarShips = char.starships.some((ship: any) => {
          let splitId = ship.split('/');
          let shipId = splitId[splitId.length - 2];
          return this.starshipsFilterArray.includes(shipId);
        });
      }
      // if (this.minBirthYear && this.maxBirthYear) {
      //   let minYear = this.extractNumericPart(this.minBirthYear);
      //   let maxYear = this.extractNumericPart(this.maxBirthYear);
      //   let charBirthYear = this.extractNumericPart(char.birth_year);
      //   console.log(
      //     'birthyear',
      //     charBirthYear,
      //     minYear,
      //     charBirthYear,
      //     maxYear,
      //     charBirthYear >= minYear && charBirthYear <= maxYear
      //   );
      //   matchesBirthYear = charBirthYear >= minYear && charBirthYear <= maxYear;
      // }

      return matchesFilms && matchesSpecies && matvhvehicles && matchstarShips;
    });
  }

  onClickCharacter(charac: any) {
    let charId = charac.url.split('/');
    charId = charId[charId.length - 2];
    this.router.navigateByUrl(`characters/${charId}`);
  }

  getSpecies(species: any, type: string) {
    let string = '';
    species.length > 0
      ? species.forEach((spec: any, i: any) => {
        let split = spec.split('/');
        string += type + split[split.length - 2];
        string += species.length - 1 > i ? ',' : '';
      })
      : '';
    return string;
  }
}
