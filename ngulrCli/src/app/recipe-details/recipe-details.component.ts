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

  currentUser: any = {};
  baseUrl = environment.apiBase;

  constructor(
    private routerThang: Router,
    private route: ActivatedRoute,
    private authThang: AuthServiceService,
    private recipeThang: RecipeServiceService,
  ) { }

  // ngOnInit() {
  //   this.authThang.checklogin()
  //     .then((userFromApi) => {
  //         this.currentUser = userFromApi;
  //         this.route.params.subscribe(params => {
  //           this.getRecipeDetails(params['id']);
  //         })
  //         })
  //     .catch(() => {
  //         this.routerThang.navigate(['/login']);
  //     });
  // } //

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.getRecipeDetails(params['id']);
   });
 }

  getRecipeDetails(id) {
    this.recipeThang.get(id)
    .subscribe((recipe) =>{
      console.log('RES = ', recipe);
      this.recipe = recipe;
    })
  }


}
