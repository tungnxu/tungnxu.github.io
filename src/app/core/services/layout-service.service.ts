import { Injectable } from '@angular/core';
import { Font, Constants } from 'src/app/shared/constants/constants';
import { CacheService } from './cache-service.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public isShowSidebar: boolean = false;
  public currentFont: Font;

  constructor(private _cacheService: CacheService) {
   
    this.currentFont = this._cacheService.getObjectCache('currentFont') as Font;
    if(this.currentFont) this.changeFont(this.currentFont);
  }

  // public toggleSidebar(): void {
  //   const body = document.getElementsByTagName('body')[0];
  //   const aside = document.getElementsByTagName('aside')[0];
  //   const mainLayout = document.getElementsByTagName('app-main-layout')[0];
  //   aside.addEventListener("transitionend", ()=>{
  //     aside.classList.remove('animation');
  //     console.log("transsition end");
  //   }, false);
  //   aside.classList.add('animation');
  //   if (!this.isShowSidebar) {
  //     body.classList.add('overflow-hidden');
  //     aside.classList.add('show');
  //     mainLayout.classList.add('show');
  //     this.isShowSidebar = true;
  //   } else {
  //     aside.classList.remove('show');
  //     mainLayout.classList.remove('show');
  //     body.classList.remove('overflow-hidden');
  //     this.isShowSidebar = false;
  //   }
  // }

  public toggleSidebar(): void {
    const body = document.getElementsByTagName('body')[0];
    const aside = document.getElementsByTagName('aside')[0];
    // const mainLayout = document.getElementsByTagName('app-main-layout')[0];
    aside.addEventListener("transitionend", ()=>{
      aside.classList.remove('animation');
      // mainLayout.classList.remove('animation');
      // console.log("transsition end");
    }, false);
    aside.classList.add('animation');
    // mainLayout.classList.add('animation')
    if (!this.isShowSidebar) {
      body.classList.add('overflow-hidden');
      aside.classList.add('show');
      // mainLayout.classList.add('show');
      this.isShowSidebar = true;
    } else {
      aside.classList.remove('show');
      // mainLayout.classList.remove('show');
      body.classList.remove('overflow-hidden');
      this.isShowSidebar = false;
    }
  }

  public changeFont(font: Font): void{
    this.addTransition();
    document.getElementsByTagName('html')[0].style.cssText = `--base-font: ${font.fontValue}`;
    document.getElementById('font').setAttribute('href',font.fontSource);
    this._cacheService.setObjectCache('currentFont',font);
  }

  private addTransition(){
    document.documentElement.classList.add('transition');
    setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 2000);
  }

  public hideSideBar(): void{
    if(this.isShowSidebar){
      this.toggleSidebar();
    }
  }
}
