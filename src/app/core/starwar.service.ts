import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StarwarService {
  constructor(private _http: HttpClient) {}

  getHomePageOfStarwars() {
    return this._http.get<any>(`https://swapi.dev/api/films`);
  }
}
