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

  readAllUsersPage(pagina: Number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }

  readUserById(id: Number): Observable<any> {
    return this.http.get(AppConstants.baseUrl.toString() + id);
  }

  deleteUserById(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl.toString() + id, { responseType: 'text' });
  }

  readUserByNamePage(name: String, page: number): Observable<any> {
    if (name !== undefined && page !== undefined) {
      //return this.http.get<any>(AppConstants.baseUrl.toString() + "usuarioPorNome/" + name.toLowerCase() + "/page/" + page);
      return this.http.get<any>(AppConstants.baseUrl.toString() + "search/nome/" + name.toLowerCase() + "/pagina/" + page + "?size=" + 5);
     
    } else {
      return this.http.get<any>(AppConstants.baseUrl.toString() + "usuarioPorNome/" + name + "/page/" + page);
    }
  }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl.toString(), user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl.toString(), user);
  }

  deleteTelephoneById(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + "removeTelephone/" + id, { responseType: 'text' });
  }

  isUserAutenticated(): boolean {
    if (localStorage.getItem("token") !== null && localStorage.getItem("token").toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }
}