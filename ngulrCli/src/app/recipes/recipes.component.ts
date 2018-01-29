import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { environment } from '../../environments/environment';
import { AuthServiceService } from '../services/auth-service.service';
import { RecipeServiceService } from '../services/recipe-service.service';
import { FilterPipe } from '../pipes/filter.pipe';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  pattern: string;

  currentUser: any = {};
  baseUrl = environment.apiBase;
  logoutError: string;

  recipeArray: any[] = [];
  recipeListError: string;

  isShowingForm: boolean = false;
  isShowingSearch: boolean = true;

  recipeInfo = {
    recipeName: "",
    recipeCookTime: undefined,
    recipeServes: undefined,
    recipeIngredients: [],
    recipeDirections: [],
    recipeType: ""
  }


  myCoolUploader = new FileUploader({
   url: environment.apiBase + '/api/recipes',
   itemAlias: 'recipePicture'
 });

 saveError: string;

  constructor(
    private authThang: AuthServiceService,
    private recipeThang: RecipeServiceService,
    private routerThang: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    // this.getThemRecipes();

    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
          this.getThemRecipes();
      })
      .catch(() => {
          this.routerThang.navigate(['/']);
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
      (allTheRecipes) => { this.recipeArray = allTheRecipes },
      () => {
        this.recipeListError = 'Sorry, could not retrieve all the recipes.'
      }
    );
  }//close getThemRecipes.

  showRecipeForm() {
    this.isShowingForm = true;
  }//close showRecipeForm();

showSearch(){
  this.isShowingSearch =true;
}

closeSearch() {
  this.isShowingSearch = false;
}



  saveNewRecipe() {
    //if no recipe, regular AJAX upload
    if (this.myCoolUploader.getNotUploadedItems().length===0){
    this.saveRecipeNoPicture();
  }
  //else, upload pictures with FileUploader
  else {
  this.saveRecipewithPicture();
  }
} //close saveNewRecipe ()

addIngredient(ingredient) {
    this.recipeInfo.recipeIngredients.push(ingredient);
  }

removeIngredient(ingredient){
  this.recipeInfo.recipeIngredients.pop();
}

addDirection(direction) {
    this.recipeInfo.recipeDirections.push(direction);
  }

removeDirection(ingredient) {
  this.recipeInfo.recipeDirections.pop();
}

private saveRecipeNoPicture() {
  this.recipeThang.newRecipe(this.recipeInfo)
  .subscribe(
    (newRecipeFromApi) => {
      this.recipeArray.push(newRecipeFromApi);
      this.isShowingForm = false;
      this.recipeInfo = {
        recipeName: "",
        recipeCookTime: undefined,
        recipeServes: undefined,
        recipeIngredients: [],
        recipeDirections: [],
        recipeType: ""
      };
      this.saveError = 'There was an error saving the recipe.'
    }
  );
}//close saveRecipeNoPicture

private saveRecipewithPicture() {
  this.myCoolUploader.onBuildItemForm = (item, form) => {
    form.append('recipeName', this.recipeInfo.recipeName);
    form.append('recipeServes', this.recipeInfo.recipeServes);
    form.append('recipeCookTime', this.recipeInfo.recipeCookTime);
    form.append('recipeType', this.recipeInfo.recipeType);
    form.append('recipeIngredients', JSON.stringify(this.recipeInfo.recipeIngredients));
    form.append('recipeDirections', JSON.stringify(this.recipeInfo.recipeDirections));

  };
  this.myCoolUploader.onSuccessItem = (item, response) =>{
    console.log(item);
    const newRecipeFromApi = JSON.parse(response);
    this.recipeArray.push(newRecipeFromApi);
    this.isShowingForm = false;
    this.recipeInfo = {
      recipeName: "",
      recipeCookTime: undefined,
      recipeServes: undefined,
      recipeIngredients: [],
      recipeDirections: [],
      recipeType: ""
    };
    this.saveError = '';
  };

  this.myCoolUploader.onErrorItem = (item, response) => {
    console.log(item, response);
    this.saveError = 'New Recipe could not be saved with picture.'
  }
  //this is the function that initiates the AJAX request
  this.myCoolUploader.uploadAll();
}//closes saveRecipewithPicture


}
