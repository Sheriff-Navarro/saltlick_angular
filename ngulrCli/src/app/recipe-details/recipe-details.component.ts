import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { RecipeServiceService } from '../services/recipe-service.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
  providers: [AuthServiceService, RecipeServiceService]

})
export class RecipeDetailsComponent implements OnInit {
  recipe: any;
  showAlert = false;
  paramsId = undefined;
  showBookmark = true;


  reviewInfo = {
    reviewRating: undefined,
    reviewReview: "",
    recipeId: ''
  }



  reviewArray: any[] = [];
  reviewListError: string;
  saveError: string;
  isShowingForm: boolean = false;

  currentUser: any = {};
  baseUrl = environment.apiBase;

  bookmarkInfo = {
    recipeId: '',
    user: this.currentUser
  }

  isShowingDirections: boolean = false;


  constructor(
    private routerThang: Router,
    private route: ActivatedRoute,
    private authThang: AuthServiceService,
    private recipeThang: RecipeServiceService,
  ) { }

  ngOnInit() {
    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
          // console.log("User's bookmark ", userFromApi.savedRecipes)
          // console.log("User's bookmark 2 ", this.currentUser.savedRecipes)
          this.checkSavedRecipes();
          this.route.params.subscribe(params => {
            this.getRecipeDetails(params['id']);
          })
          })
      .catch(() => {
          this.routerThang.navigate(['/']);

      });

      this.getParams();
      // this.checkSavedRecipes();
  } //

  triggerAlert() {
    this.showAlert = true;
  }

  hideAlert() {
    this.showAlert = false;
  }

  hideBookmark() {
    this.showBookmark = false;
  }

// this.currentUser.savedRecipes.indexOf(this.paramsId)

checkSavedRecipes(){
  console.log('check saved recipes running...', this.paramsId, this.currentUser.savedRecipes)
  // let result =
  if(this.currentUser.savedRecipes.find( elem => elem == this.paramsId)){
  this.showBookmark = false;
} else {
  this.showBookmark = true;
}
  // console.log("found ", result)
}



getParams() {
  this.route.params.subscribe(params=> {
    this.paramsId = params['id'];
    console.log("Params Id ", this.paramsId)
  })
}



  getRecipeDetails(id) {
    this.recipeThang.get(id)
    .subscribe((recipe) =>{
      console.log('RES = ', recipe);
      this.recipe = recipe;
    })
  }

  showReviewForm() {
    this.isShowingForm = true;
  }//close showRecipeForm();

  showDirections() {
      this.isShowingDirections = true;
  }

  hideDirections() {
    this.isShowingDirections = false;
  }

getParamsId(){
this.route.params.subscribe(params => {
  this.saveNewReview(params['id']);
})
}

bookmarkRecipeComp(id, currentUserId){
  console.log("Anything   ", currentUserId);
  this.recipeThang.bookmarkRecipe(id, currentUserId)

  // .subscribe()
  .subscribe((recipe) =>{
    console.log('RES = ', recipe);
    this.recipe = recipe;
  })
}


saveNewReview(id) {
  this.recipeThang.newReview(this.reviewInfo, id)
    .subscribe(
      (newReviewFromApi) => {
        this.recipe.review.push(newReviewFromApi);
        this.isShowingForm = false;
        this.reviewInfo = {
          reviewRating: undefined,
          reviewReview: '',
          recipeId: '',
        };//close this.reviewInfo
        this.saveError = 'There was an error saving the review.';
      }//close newReviewFromApi
    );//close subscribe
}//close saveNewReview


}
