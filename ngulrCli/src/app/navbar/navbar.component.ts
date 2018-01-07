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

    this.authThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
      })
      .catch(() => {
          this.routerThang.navigate(['/']);
      });
  } // close ngOnInit()

}
