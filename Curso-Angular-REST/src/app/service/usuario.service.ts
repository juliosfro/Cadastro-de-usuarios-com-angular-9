import { User } from './../model/user';
import { AppConstants } from './../app-constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  readAllUsers(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl.toString());
  }

  readUserById(id: Number): Observable<any> {
    return this.http.get(AppConstants.baseUrl.toString() + id);
  }

  deleteUserById(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl.toString() + id, { responseType: 'text' });
  }

  readUserByName(name: String): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl.toString() + "usuarioPorNome/" + name.toLowerCase());
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl.toString(), user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl.toString(), user);
  }

  isUserAutenticated(): boolean {
    if (localStorage.getItem("token") !== null && localStorage.getItem("token").toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }
}
