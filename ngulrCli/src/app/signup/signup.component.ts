import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
isLoggedOut: boolean = false;

signUpInfo = {
  fullName: '',
  email: '',
  password: ''
};

errorMessage: string;

  constructor(
    private authThang: AuthServiceService,
    private routerThang: Router
  ) { }

  ngOnInit() {
    this.authThang.checklogin()
    //if success, we are logged in.
    .then((resultFromApi) => {
    this.routerThang.navigate(['/recipes']);
  })
  //If you don't do anything on error, catch to avoid a consle error.
  .catch((err) => {
  this.isLoggedOut = true;
});
}

doSignUp() {
   this.authThang.signup(this.signUpInfo)
     .then((resultFromApi) => {
         // clear form
         this.signUpInfo = {
           fullName: '',
           email: '',
           password: ''
         };

         // clear error message
         this.errorMessage = "";

         // redirect to /camels
         this.routerThang.navigate(['/signup']);
     })
     .catch((err) => {
         const parsedError = err.json();
         this.errorMessage = parsedError.message + ' 😤';
     });
 } // close doSignUp()





}
