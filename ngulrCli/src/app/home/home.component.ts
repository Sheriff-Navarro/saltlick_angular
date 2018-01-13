import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { RecipeServiceService } from '../services/recipe-service.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthServiceService, RecipeServiceService]
})
export class HomeComponent implements OnInit {
  isShowingLogin: boolean = false;
  isShowingSignup: boolean = true;
  currentUser: any = {};


  loginInfo = {
    email: '',
    password: ''
  };

  loginErrorMessage: string;

  signUpInfo = {
    fullName: '',
    email: '',
    password: '',
    picture: ''
  };

  myCoolUploader = new FileUploader({
   url: environment.apiBase + '/api/signup',
   itemAlias: 'thumbnail'
 });

 saveError: string;
  errorMessage: string;


  constructor(
  private routerThang: Router,
  private route: ActivatedRoute,
  private authThang: AuthServiceService,
  private recipeThang: RecipeServiceService,
) { }

  ngOnInit(
    ) {
  }

  showLoginForm() {
    this.isShowingLogin = true;
    this.isShowingSignup = false;
  }//close showRecipeForm();


  showSignupForm() {
      this.isShowingSignup = true;
      this.isShowingLogin = false;
    }//close showRecipeForm();

  // saveNewUser(){
  //   if (this.myCoolUploader.getNotUploadedItems().length === 0) {
  //     this.saveUserNoPicture();
  //   }
  //   else {
  //     this.saveUserWithPicture();
  //   }
  // }

    doSignUp() {
       this.authThang.signup(this.signUpInfo)
         .then((resultFromApi) => {
             // clear form
             this.signUpInfo = {
               fullName: '',
               email: '',
               password: '',
               picture: ''
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
