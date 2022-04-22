import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { Photo } from './../models/photo';
import { City } from './../models/city';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(
    private httpClient: HttpClient,
    private alertService: AlertifyService,
    private router: Router
  ) {}
  path = 'https://localhost:44325/api/';

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + 'cities');
  }

  getCityById(cityId: number): Observable<City> {
    return this.httpClient.get<City>(this.path + 'cities/detail/?id=' + cityId);
  }

  getPhotosByCity(cityId: number): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(
      this.path + 'cities/photos/?cityId=' + cityId
    );
  }

  add(city) {
    this.httpClient.post(this.path + 'cities/add', city).subscribe((data) => {
      this.alertService.success('Şehir başarıyla eklendi.');
      this.router.navigateByUrl('/cityDetail/' + data['id']);
    });
  }
}
