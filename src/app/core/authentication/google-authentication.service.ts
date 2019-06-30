import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Users } from 'src/app/shared/models/users.model';
import { AuthenticationService } from './authentication.service';
import { md5 } from 'src/app/shared/helpers/md5';
import { LoadingBarService } from '@ngx-loading-bar/core';
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthenticationService {


  constructor(private authenticationService : AuthenticationService) { }

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
        // this.loadingBar.start();
       
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('access_token || ' + googleUser.getAuthResponse().access_token);
        console.log('expires_in || ' + googleUser.getAuthResponse().expires_in);
        console.log('expires_at || ' + googleUser.getAuthResponse().expires_at);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        const currentUser: Users = {
          id: profile.getId(),
          name: profile.getName(),
          avatar: profile.getImageUrl(),
          // email: profile.getEmail(),
          accessToken: googleUser.getAuthResponse().access_token
        }
        this.authenticationService.setCurrentUser(currentUser);
        
        // this.loadingBar.complete();
      
       

      }, (error) => {
        // this.loadingBar.complete();
        console.log(error);

      });
  }

 
}
