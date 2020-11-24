import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Users} from '../model/users';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
private url = environment.baseUrl + '/login';
  constructor(private httpClient: HttpClient) { }

public authenticate(user: Users) {
  return this.httpClient.post(this.url, user, {observe: 'response'} );

}
}
