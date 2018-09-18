import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postLoginData(username, password) {
    return this.http.post('http://localhost:3000/login', {
      username,
      password
    }).subscribe(data => {
      console.log('Response to Login-Request: ', data)
    })
  }
}
