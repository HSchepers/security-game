import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(public api: ApiService) { }
  ngOnInit() {

  }

  onLogin() {
    const username = this.username
    const password = this.password
    this.api.postLoginData(username, password)
  };
}
