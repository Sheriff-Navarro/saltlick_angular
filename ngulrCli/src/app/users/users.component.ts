import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { AuthServiceService } from '../services/auth-service.service';
import { RecipeServiceService } from '../services/recipe-service.service';
import {UserServiceService} from '../services/user-service.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  pattern: string;
  currentUser: any = {};
  baseUrl = environment.apiBase;
  logoutError: string;
  saveError: string;
  userArray: any[] = [];
  userListError: string;
  isShowingSearch: boolean = true;


  constructor(
    private authThang: AuthServiceService,
    private recipeThang: RecipeServiceService,
    private userThang: UserServiceService,
    private routerThang: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
          this.getThemUsers();
      })
      .catch(() => {
          this.routerThang.navigate(['/']);
      });
  }

  getThemUsers() {
    this.userThang.allUsers()
    .subscribe(
      (allTheUsers) => { this.userArray = allTheUsers },
      () => {
        this.userListError = 'Sorry, could not retrieve all the users.'
      }
    );
  }//close getThemUsers.

}
