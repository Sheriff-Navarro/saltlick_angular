import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class ProfileServiceService {

  constructor(
    private httpThang: Http
  ) {  }


  getProfile(id){
    return this.httpThang
    .get(
      `${environment.apiBase}/api/profile/${id}`,
      {withCredentials: true }
    )
    //parse the json
    .map(res => res.json());
  }//close specific recipe

  doFollowUser(id, user) {
  var userId = {id:user._id}
    return this.httpThang
    .post(`${environment.apiBase}/api/profile/${id}/follow`, userId,
    {withCredentials:true}
  )
  //parse the JSON
  .map(res => res.json());
  }



}
