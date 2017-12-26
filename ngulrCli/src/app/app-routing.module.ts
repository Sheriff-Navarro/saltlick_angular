import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { RecipesComponent } from './recipes/recipes.component'
import { LoginComponent } from './login/login.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

export const routes: Routes = [


  {path: '', component: SignupComponent},
  {path: 'signup', component: SignupComponent  },
  {path: 'login', component: LoginComponent },
  {path: 'recipe/:id', component: RecipeDetailsComponent},
  {path: 'recipes', component: RecipesComponent },
  // {path: '**', redirectTo: ''}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
