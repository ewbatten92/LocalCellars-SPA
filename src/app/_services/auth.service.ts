import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';

constructor(private http: HttpClient) { }

login(model: any){
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
      }
    })
  );
 }
}
