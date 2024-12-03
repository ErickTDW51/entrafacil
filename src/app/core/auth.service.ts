import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  public login(usuario: string, password: string): Observable<any> {

    return this.http.post(environment.url + '/login', { usuario, password })

  }
  public user(): Observable<any> {
    return this.http.get(environment.url + '/get-user', {});
  }

  public registro(usuario:string, nombre:string, email:string, password:string, rol:string): Observable<any>{
    return this.http.post(environment.url + '/register',{usuario, nombre, email, password, rol});
  }

}