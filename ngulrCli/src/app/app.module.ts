//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
//SERVICES
import { AuthServiceService } from './services/auth-service.service';
import { RecipeServiceService } from './services/recipe-service.service';
import { ProfileServiceService }from './services/profile-service.service';
//COMPONENTS
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    RecipesComponent,
    LoginComponent,
    RecipeDetailsComponent,
    NotFoundComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FileUploadModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthServiceService,
    RecipeServiceService,
    ProfileServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
