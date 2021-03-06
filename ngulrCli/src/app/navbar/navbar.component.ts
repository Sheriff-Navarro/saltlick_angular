import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any = {};
  baseUrl = environment.apiBase;
  logoutError: string;
  constructor(
    private authThang: AuthServiceService,
    private routerThang: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.getThemRecipes();
    console.log("NG INIT USERFROMAPI");
    this.authThang.checklogin()
      .then((userFromApi) => {
          console.log("USERFROMAPI = ", userFromApi);
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
