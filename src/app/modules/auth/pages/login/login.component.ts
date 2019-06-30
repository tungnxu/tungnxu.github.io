import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { tap, finalize, catchError, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {};
  public errorMessage: string;
  public isLoading: boolean;



  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user);
    this.isLoading = true;

    this.authenticationService.login(this.user).pipe(
      take(1),
      tap(() => { this.router.navigate(['/']); }, (err) => { this.errorMessage = err.error.error; }),
      finalize(() => { this.isLoading = false; })
    ).subscribe();
  }


  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '687145251030-67daicf973h7ks0dafgp9occ98brkd4a.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('access_token || ' + googleUser.getAuthResponse().access_token);
        // console.log('expires_in || ' + googleUser.getAuthResponse().expires_in);
        // console.log('expires_at || ' + googleUser.getAuthResponse().expires_at);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
       

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
