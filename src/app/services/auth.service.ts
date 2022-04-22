import { RegisterUser } from './../models/registerUser';
import { Router } from '@angular/router';
import { LoginUser } from './../models/loginUser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  path = 'https://localhost:44325/api/auth/';
  helper: JwtHelperService = new JwtHelperService();
  userToken: any;
  decodedToken: any;
  TOKEN_KEY = 'token';
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertService: AlertifyService
  ) {}

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'login', loginUser, { headers: headers })
      .subscribe((data) => {
        this.saveToken(data);
        this.userToken = data;
        this.decodedToken = this.helper.decodeToken(data.toString());
        this.alertService.success('Sisteme giriş yapıldı.');
        this.router.navigateByUrl('/city');
      });
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'register', registerUser, {
        headers: headers,
      })
      .subscribe((data) => {});
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertService.error('Sistemden çıkış yapıldı')
  }

  //! Buraya bakılacak
  loggedIn() {
    return this.helper.isTokenExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserId() {
    return this.helper.decodeToken(this.token).nameid;
  }
}
