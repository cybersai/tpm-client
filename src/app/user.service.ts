import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = 'https://trans-pm.herokuapp.com/api/users';

  constructor(private httpClient: HttpClient) { }

  all(db: string = 'postgresql') {
    return this.httpClient.get(this.BASE_URL + '?connection=' + db, {
      headers
    });
  }

  store(user) {
    return this.httpClient.post(this.BASE_URL, user, {
      headers
    });
  }

  update(id, user) {
    console.log(user);
    return this.httpClient.put(this.BASE_URL + '/' + id, user, {
      headers
    });
  }

  delete(id, connection: string = 'postgresql') {
    return this.httpClient.delete(this.BASE_URL + '/' + id + '?connection=' + connection, {
      headers
    });
  }
}
