import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(public authService: AuthService) {}

  loginUser: any = {}; //* User'ın ilk başta boş bi nesne olacağından dolayı

  ngOnInit() {}

  login() {
    this.authService.login(this.loginUser);
  }

  logOut() {
    this.authService.logOut();
  }

  //! Buraya bakılacak
  isAuthenticated() {
     return this.authService.loggedIn();
  }
}
