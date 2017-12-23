import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { environment } from '../../environments/environment';
import { AuthServiceService } from '../services/auth-service.service';
import { RecipeServiceService } from '../services/recipe-service.service';



@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  currentUser: any = {};
  baseUrl = environment.apiBase;
  logoutError: string;

  recipeArray: any[] = [];
  recipeListError: string;

  myCoolUploader = new FileUploader({
   url: environment.apiBase + '/api/recipes',
   itemAlias: 'recipePicture'
 });

  constructor(
    private authThang: AuthServiceService,
    private recipeThang: RecipeServiceService,
    private routerThang: Router

  ) { }

  ngOnInit() {
    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
          this.getThemRecipes();
      })
      .catch(() => {
          this.routerThang.navigate(['/login']);
      });
  } // close ngOnInit()

  logMeOutPls() {
    this.authThang.logout()
      .then(() => {
          this.routerThang.navigate(['/']);
      })
      .catch(() => {
          this.logoutError = 'Log out went to 💩';
      });
  } // close logMeOutPls()s


  getThemRecipes() {
    this.recipeThang.allRecipes()
    .subscribe(
      (allTheRecipes) => { this.recipeArray = allTheRecipes }
      () => {
        this.recipeListError = 'Sorry, could not retrieve all the recipes'
      }
    );
  }//close getThemRecipes.

}
