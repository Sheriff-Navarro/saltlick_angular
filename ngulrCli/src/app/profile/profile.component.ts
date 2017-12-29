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
          })      })
      .catch(() => {
          this.routerThang.navigate(['/login']);
      });
  }

  getThemProfileRecipe(id) {
    this.profileThang.getProfile(id)
    .subscribe(
      (usersRecipes) => { this.userRecipeArray = usersRecipes },
      () => {
        this.recipeListError = 'Sorry, could not retrieve all the recipes'
      }
    );
  }//close getThemRecipes.


}
