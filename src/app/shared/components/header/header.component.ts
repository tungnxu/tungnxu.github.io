import { Component, OnInit, ChangeDetectorRef, Inject, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { CategoryService } from 'src/app/core/mocks/categories_data';
import { CategoryModel } from '../../models/categories.model';
import { Observable } from 'rxjs';
import Utils from '../../helpers/utils';
import { LayoutService } from 'src/app/core/services/layout-service.service';
import { GoogleAuthenticationService } from 'src/app/core/authentication/google-authentication.service';
import { Users } from '../../models/users.model';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FacebookAuthenticationService } from 'src/app/core/authentication/facebook-authentication.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {'class': 'app-header'}
})
export class HeaderComponent implements OnInit {

  public user: Users;
  public categories$: Observable<CategoryModel[]>;
  constructor(@Inject(DOCUMENT) document, private authenticationService: AuthenticationService, private categoryService: CategoryService, private layoutService : LayoutService, private googleAuthenticationService : GoogleAuthenticationService, private facebookAuthenticationService : FacebookAuthenticationService, private router : Router, private  cd: ChangeDetectorRef) {
   
   }

  ngOnInit() {
    this.categories$ = this.categoryService.get();
    this.authenticationService.currentUser$.subscribe(user => {
      
      this.user = user;
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    this.googleAuthenticationService.googleInit();
    this.facebookAuthenticationService.facebookInit();
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  public showSlugSEO(str: string): string{
    return str? Utils.slugify(str)+'-cat.': ""+'-cat.';
  }

  public toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  public loginFB() {
    this.facebookAuthenticationService.loginWithFB();
  }

  previousPosition: number = 0;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.getElementById('category-navigation');
    
     if (window.pageYOffset > 450) {
      
     
      if(window.pageYOffset > this.previousPosition ){
        // console.log("keos xuoongs");
        element.classList.remove('show');
      }else{
        element.classList.add('show');
        // console.log("keo len");
      }
      this.previousPosition = window.pageYOffset;
     } else {
      element.classList.remove('show');
    
      // let element = document.getElementById('navbar');
     }
  }
 

}
