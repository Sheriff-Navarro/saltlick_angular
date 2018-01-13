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

  paramsId = undefined;

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
          this.route.params.subscribe(params => {
            this.getRecipeDetails(params['id']);
          })
          })
      .catch(() => {
          this.routerThang.navigate(['/']);
      });

  } //

 //  ngOnInit() {
 //    this.route.params.subscribe(params => {
 //     this.getRecipeDetails(params['id']);
 //   });
 // }

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
