import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    //In order to do something with the token coming back from the server
    //We must use our rxjs operators, and in order to make use of our rxjs operators
    //then we need to pass them through a pipe method this will allow us to chain our
    //rxjs operators to our request
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        //This user variable will actually be the token object
        const user = response;
        //If theres an obj in user then set it to localstorage, specify the token and pass in
        //user.token
        if (user) {
          localStorage.setItem('token', user.token);
          //Grab token in local storage and use jwthelper to decode its contents
          //and store in auth service
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  // Grab token from localstorage
  // So we can keep logic in nav component we will use ! so if the token is expired our loggedIn method will
  // return false to the nav component
  // if its not expired then itll return true
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
