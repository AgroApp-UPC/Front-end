import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { enviroment } from '../../../../enviroment/enviroment.development';
import {User} from '../domain/model/profile.entity';
import {UserAssembler} from '../domain/model/profile.assembler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = `${enviroment.BASE_URL}${enviroment.ENDPOINT_PATH_USER}`;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => UserAssembler.toEntityFromResource(response))
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.userUrl}/${user.id}`;
    return this.http.put<User>(url, user);
  }
  deleteAccountData(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    const clearedUser = {
      id: id,
      user_name: "",
      email: "",
      phone_number: "",
      identificator: "",
      password: ""
    };
    return this.http.put<User>(url, clearedUser);
  }
}
