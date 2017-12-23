 import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';


@Injectable()
export class RecipeServiceService {

  constructor(
    private httpThang: Http

  ) { }


  allRecipes() {
      return this.httpThang
        .get(
          `${environment.apiBase}/api/recipes`,
          // Send the cookies across domains
          { withCredentials: true }
        )
        // Parse the JSON
        .map(res => res.json());
  } // close allRecipes()


}
