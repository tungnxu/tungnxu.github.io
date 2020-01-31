import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Users } from 'src/app/shared/models/users.model';
import { md5 } from 'src/app/shared/helpers/md5';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthenticationService } from './authentication.service';
import { ModalGeneratorService } from '../services/modal-generator.service';
declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthenticationService {

  constructor(private authenticationService: AuthenticationService, private modalGeneratorService: ModalGeneratorService) {
   }

  public facebookInit() {
    {
      (window as any).fbAsyncInit = function () {
        FB.init({
          appId: '1300144616821288',
          cookie: true,
          xfbml: true,
          version: 'v3.3'
        });

        FB.AppEvents.logPageView();

      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }

  public loginWithFB(): void {
    FB.login((response) => {
      if (response.authResponse) {
          FB.api("/" + response.authResponse.userID + "?fields=id,name,first_name,last_name,email",  (userData) => {
            if (userData && !userData.error) {
              const currentUser: Users = {
                id: userData.id,
                name: userData.name,
                avatar: "https://graph.facebook.com/v3.3/" + userData.id + "/picture?type=normal",
                email: userData.email,
                accessToken: response.authResponse.accessToken
              }
              this.authenticationService.setCurrentUser(currentUser);
              this.modalGeneratorService.removeModal();
            }
          }
        );
      }
      else {
        console.log('User login failed');
      }
    });
    
  }

}
