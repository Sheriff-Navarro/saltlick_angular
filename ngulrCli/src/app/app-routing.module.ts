import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { RecipesComponent } from './recipes/recipes.component'
const routes: Routes = [


  {path: '', component: SignupComponent},
  {path: 'signup', component: SignupComponent  },
  {path: 'recipes', component: RecipesComponent },
  {path: '**', redirectTo: ''}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
