import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  currentUser: any = {};
  baseUrl = environment.apiBase;
  logoutError: string;


  constructor(
    private authThang: AuthServiceService,
    private routerThang: Router

  ) { }

  ngOnInit() {
    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
      })
      .catch(() => {
          this.routerThang.navigate(['/']);
      });
  } // close ngOnInit()

  logMeOutPls() {
    this.authThang.logout()
      .then(() => {
          this.routerThang.navigate(['/']);
      })
      .catch(() => {
          this.logoutError = 'Log out went to 💩';
      });
  } // close logMeOutPls()s

}
