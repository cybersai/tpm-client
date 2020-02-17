import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = 'https://trans-pm.herokuapp.com/api/users';

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get(this.BASE_URL, {
      headers
    });
  }

  store(user) {
    return this.httpClient.post(this.BASE_URL, user, {
      headers
    });
  }

  update(user) {
    return this.httpClient.put(this.BASE_URL + '/' + user.id, user, {
      headers
    });
  }

  delete(id) {
    return this.httpClient.delete(this.BASE_URL + '/' + id, {
      headers
    });
  }
}
