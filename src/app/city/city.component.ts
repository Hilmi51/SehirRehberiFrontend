import { City } from './../models/city';
import { CityService } from './../services/city.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService],
})
export class CityComponent implements OnInit {
  constructor(private cityService: CityService) {}

  cities: City[];

  ngOnInit() {
    //* Veri ulaşma işlerini başka katmanda yazmamız gereklidir. O yüzden operasyonları serivce'de yazıyoruz.
    //* => Visiblity: tekrar tekrar kullanabilirlik.
    this.cityService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }
}
