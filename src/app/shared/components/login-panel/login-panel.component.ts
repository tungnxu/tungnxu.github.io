import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { CategoryService } from 'src/app/core/mocks/categories_data';
import { LayoutService } from 'src/app/core/services/layout-service.service';
import { GoogleAuthenticationService } from 'src/app/core/authentication/google-authentication.service';
import { FacebookAuthenticationService } from 'src/app/core/authentication/facebook-authentication.service';
import { Users } from '../../models/users.model';
import { ModalGeneratorService } from 'src/app/core/services/modal-generator.service';
import { CacheService } from 'src/app/core/services/cache-service.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {
  public user: Users;
  constructor(private authenticationService: AuthenticationService, 
    private googleAuthenticationService : GoogleAuthenticationService, 
    private facebookAuthenticationService : FacebookAuthenticationService,
    private modalGeneratorService: ModalGeneratorService,
    private _cacheService : CacheService) { }

  ngOnInit() {
    this.user = this._cacheService.getObjectCache('_cu')
    // this.authenticationService.currentUser$.subscribe(user => {
    //   this.user = user;
    // });
  }

  ngAfterViewInit(): void {
    if (!this.user){
      this.googleAuthenticationService.googleInit();
      this.facebookAuthenticationService.facebookInit();
    }
  }
  

  public loginFB() {
    this.facebookAuthenticationService.loginWithFB();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.modalGeneratorService.removeModal();
  }

  public closeModal():void {
    this.modalGeneratorService.removeModal();
  }

}
