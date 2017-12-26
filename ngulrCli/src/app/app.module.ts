import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthServiceService } from './services/auth-service.service';
import { RecipeServiceService } from './services/recipe-service.service';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    RecipesComponent,
    LoginComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FileUploadModule,
    FormsModule,
    RouterModule.forRoot(routes, { enableTracing: true } // <-- debugging purposes only
),
  ],
  providers: [
    AuthServiceService,
    RecipeServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
