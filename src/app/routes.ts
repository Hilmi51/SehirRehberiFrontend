import { RegisterComponent } from './register/register.component';
import { CityAddComponent } from './city/city-add/city-add.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { ValueComponent } from './value/value.component';
import { CityComponent } from './city/city.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'city', component: CityComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cityadd', component: CityAddComponent },
  { path: 'value', component: ValueComponent },
  { path: 'cityDetail/:cityId', component: CityDetailComponent },
  { path: '**', redirectTo: 'city', pathMatch: 'full' },
];
