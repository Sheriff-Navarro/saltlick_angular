import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo = {
    email: '',
    password: ''
  };

  loginErrorMessage: string;

  isLoggedOut: boolean = false;


  constructor(
    private authThang: AuthServiceService,
    private routerThang: Router
  ) { }

  ngOnInit() {
    this.authThang.checklogin()
      // If success, we are logged in.
      .then((resultFromApi) => {
          this.routerThang.navigate(['/recipes']);
      })

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch((err) => {
          this.isLoggedOut = true;
      });
  }

  doLogin() {
      this.authThang.login(this.loginInfo)
        .then((resultFromApi) => {
            // clear the form
            this.loginInfo = {
              email: '',
              password: ''
            };

            // clear the error message
            this.loginErrorMessage = "";

            // redirect to /camels
            this.routerThang.navigate(['/recipes']);
        })
        .catch((err) => {
            const parsedError = err.json();
            this.loginErrorMessage = parsedError.message + ' 😤';
        });
    } // close doLogin()





}
