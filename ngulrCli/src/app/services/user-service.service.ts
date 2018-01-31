import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';


@Injectable()
export class UserServiceService {

  constructor(
    private httpThang: Http

  ) { }



allUsers() {
  return this.httpThang
  .get(`${environment.apiBase}/api/users`,
  //send the cookies across domains
  {withCredentials: true}
)
//parse the json
.map(res => res.json());
}//close allUsers()



}
