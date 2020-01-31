import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/shared/models/users.model';
import { md5 } from 'src/app/shared/helpers/md5';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = 'https://reqres.in/api';
  private loggedIn = false;
  private currentUserSubject: BehaviorSubject<Users>;

  static readonly ADMIN_CODE: string = '115735901459427677310';
  public currentUser$: Observable<any>;


  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('_cu')));
    this.currentUser$ = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): any {
     return this.currentUserSubject.value;
   }

   public setCurrentUser(user: any): void {
    localStorage.setItem('_cu', JSON.stringify(user));
    this.currentUserSubject.next(user);
    // this.currentUser$ = this.currentUserSubject.asObservable();
   }

   public isAdministrator(): boolean {
      if(this.currentUserSubject.value && this.currentUserSubject.value.id == AuthenticationService.ADMIN_CODE){
        return true;
      }
      return false;
   }

  public login(user: any): Observable<any> {
    return this.httpClient.post(`${this.authUrl}/login`, user).pipe(tap(token => {
      if (token) {
        const object = {email : user.email, token: token.token};
        localStorage.setItem('currentUser', JSON.stringify(object));
        // this.currentUserSubject.next(object);
        // this.currentUserSubject.subscribe(data => console.log(data.email + 'gia trij'));
        // this.currentUser$ = this.currentUserSubject.asObservable();
      }
    }));
    // return of(1);
  }

  public logout(): void {
    localStorage.removeItem('_cu');
    this.currentUserSubject.next(null);
  }
}
