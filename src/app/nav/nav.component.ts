import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
        next => {
        this.alertify.success('Logged in successfully');
      },
      error => {
        this.alertify.error(error);
      }, () => {
      this.router.navigate(['/cellars']);
      });
  }
  // Storing the token we get back from the client in our local storage in the browser
  loggedIn() {
    //Return boolean on whether or not user is logged in or not.
    //The logic of storing token and check its expiry date (token check for validity)
    //are kept separate in auth service
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
