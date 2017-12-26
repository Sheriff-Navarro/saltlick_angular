import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class RecipeServiceService {

  constructor(
    private httpThang: Http

  ) { }


  newRecipe(componentInfo) {
    return this.httpThang
      .post(
        `${environment.apiBase}/api/recipes`,

        // Form body information to send to the back end (req.body)
        componentInfo,

        // Send the cookies across domains
        { withCredentials: true }
      )

      // Parse the JSON
      .map(res => res.json());
} // close newCamel()

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

get(id){
  return this.httpThang
  .get(
    `${environment.apiBase}/api/recipes/${id}`,
    {withCredentials: true }
  )
  //parse the json
  .map(res => res.json());
}//close specific recipe

// get(id) {
//   var temp = this.httpThang.get(`${environment.apiBase}/api/recipes/${id}`)
//     .map((res) => res.json());
//     return temp;
// }

// get(id) {
//   return this.httpThang.get(`${environment.apiBase}/api/recipes/${id}`)
//   .map((res) => res.json());
// }




}
