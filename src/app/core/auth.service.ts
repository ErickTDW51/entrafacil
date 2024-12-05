import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  public login(id_usuario: string, password: string): Observable<any> {

    return this.http.post(environment.url + '/login', { id_usuario, password })

  }
  public user(id_usuario: string): Observable<any> { 
    const params = new HttpParams().set('id_usuario', id_usuario); 
    return this.http.get(environment.url + '/user1', { params }); 
  }

  public registro(id_usuario:string, nombre:string, email:string, password:string, rol:string): Observable<any>{
    return this.http.post(environment.url + '/register',{id_usuario, nombre, email, password, rol});
  }

}