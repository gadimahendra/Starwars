import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private _http: HttpClient) {}

  getStarwarsHomepage(api: string) {
    return this._http.get<any>(api);
  }

  getFiltersType(type: string, page: any = '') {
    return this._http.get<any>(
      `${environment.baseUrl}/${type}/${page !== '' ? `${page}` : ''}`
    );
  }

  getPersonById(id: any) {
    return this._http.get<any>(`${environment.baseUrl}/people/${id}`);
  }
}
