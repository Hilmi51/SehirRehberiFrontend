import { Photo } from './../../models/photo';
import { City } from './../../models/city';
import { CityService } from './../../services/city.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from 'ngx-gallery-9';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
  providers: [CityService],
})
export class CityDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private cityService: CityService
  ) {}

  city: City;
  photos: Photo[] = [];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getCityById(params['cityId']);
    });
  }

  getCityById(cityId: number) {
    this.cityService.getCityById(cityId).subscribe((data) => {
      this.city = data;
      console.log(data);
      this.getPhotosByCity(data.id);
    });
  }

  getPhotosByCity(cityId: number) {
    this.cityService.getPhotosByCity(cityId).subscribe((data) => {
      this.photos = data;
      this.setGallery(); //* resimleri şehri yükledikten sonra getirir
    });
  }

  getImages() {
    const imageUrls: NgxGalleryImage[] = [];
    for (let i = 0; i < this.photos.length; i++) {
      imageUrls.push({
        small: this.photos[i].url,
        medium: this.photos[i].url,
        big: this.photos[i].url,
      });
    }
    return imageUrls;
  }

  setGallery() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = this.getImages();
    console.log(this.galleryImages);
  }
}
