import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { environment } from '../../environments/environment';
import { AuthServiceService } from '../services/auth-service.service';
import { RecipeServiceService } from '../services/recipe-service.service';
import { ProfileServiceService} from '../services/profile-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthServiceService, RecipeServiceService, ProfileServiceService]

})
export class ProfileComponent implements OnInit {
  recipe: any;
  currentUser: any = {};
  userRecipeArray: any[] = [];
  recipeListError: string;
  baseUrl = environment.apiBase;
  data: any;
  recipeCount: number;

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
    private routerThang: Router,
    private route: ActivatedRoute,
    private authThang: AuthServiceService,
    private recipeThang: RecipeServiceService,
    private profileThang: ProfileServiceService
    ) { }

  ngOnInit() {
    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
          this.route.params.subscribe(params => {
            this.getThemProfileRecipe(params['id']);
          })
        })
      .catch(() => {
          this.routerThang.navigate(['/']);
      });
      // this.countRecipes();

  }

  getThemProfileRecipe(id) {
    this.profileThang.getProfile(id)
    .subscribe(
      (data) => { this.data = data },
      () => {
        this.recipeListError = 'Sorry, could not retrieve all the recipes'
      }
    );
  }//close getThemRecipes.

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


  countRecipes() {
  this.recipeCount = this.data.recipe.length;
}
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
      this.data.recipe.push(newRecipeFromApi);
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
    this.data.recipe.push(newRecipeFromApi);
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
