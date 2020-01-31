import { Component, OnInit, ChangeDetectorRef, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { CategoryService } from 'src/app/core/mocks/categories_data';
import { CategoryModel } from '../../models/categories.model';
import { Observable } from 'rxjs';
import Utils from '../../helpers/utils';
import { LayoutService } from 'src/app/core/services/layout-service.service';
import { GoogleAuthenticationService } from 'src/app/core/authentication/google-authentication.service';
import { Users } from '../../models/users.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { FacebookAuthenticationService } from 'src/app/core/authentication/facebook-authentication.service';
import { DOCUMENT } from "@angular/common";
import { ModalOptions, ModalGeneratorService } from 'src/app/core/services/modal-generator.service';
import { LoginPanelComponent } from '../login-panel/login-panel.component';
import { ModalComponent } from '../modal/modal.component';
import { Font, Constants } from '../../constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'app-header'}
})
export class HeaderComponent implements OnInit {

  public user: Users;
  public categories$: Observable<CategoryModel[]>;
  public currentCat: CategoryModel;
  public codeQuery: string;
  constructor(@Inject(DOCUMENT) document, 
  private authenticationService: AuthenticationService, 
  private categoryService: CategoryService, 
  private layoutService : LayoutService, 
  private googleAuthenticationService : GoogleAuthenticationService, 
  private facebookAuthenticationService : FacebookAuthenticationService, 
  private router : Router, 
  private route: ActivatedRoute,
  private  cd: ChangeDetectorRef,
  private modalGeneratorService: ModalGeneratorService) {
    this.route.queryParams.subscribe(params => {
      this.codeQuery = window.location.pathname.split(".", 2)[1]; 
    })
   
   }

  ngOnInit() {
    this.categories$ = this.categoryService.get();
    this.authenticationService.currentUser$.subscribe(user => {
      
      this.user = user;
      this.cd.detectChanges();
    });
  }

  public selectedCat(cat : CategoryModel): boolean{
    this.currentCat = cat;
    return cat ==  this.currentCat
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


  public loginPopup(){
    // let oldPost: PostModel = new PostModel();
    // oldPost = this.post;
    let modalOptions = new ModalOptions('', null);
    modalOptions.template = LoginPanelComponent;
    modalOptions.css = ['modal-xs'];
    modalOptions.cancelCallback = ()=>{
      console.log("Do After Close PopUP");
    }
    this.modalGeneratorService.addModal(ModalComponent, modalOptions);
    
  }

  previousPosition: number = 0;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.getElementById('main-navigation');
    if(window.pageYOffset > 30) {
      element.classList.add('has-color');
    } else {
      element.classList.remove('has-color');
    }
   
    // if(window.pageYOffset == 0)    element.classList.remove('has-color');

     if (window.pageYOffset > 450) {
      
      if(window.pageYOffset < this.previousPosition ){
        // console.log("keo len");
        element.classList.add('show');
        
      }else{
        
        element.classList.remove('show');
        // console.log("keo xuong");
      }
      this.previousPosition = window.pageYOffset;
     } else {
      // element.classList.remove('show');
    
      // let element = document.getElementById('navbar');
     }
  }
 

}
