import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { RecipesComponent } from './recipes/recipes.component'
import { LoginComponent } from './login/login.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [


  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent  },
  {path: 'login', component: LoginComponent },
  {path: 'recipe/:id', component: RecipeDetailsComponent},
  {path: 'recipes', component: RecipesComponent },
  {path: 'profile/:id', component: ProfileComponent },
  {path: '**', component: NotFoundComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
