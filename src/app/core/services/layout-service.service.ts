import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public isShowSidebar: boolean = false;

  constructor() { }

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
    const mainLayout = document.getElementsByTagName('app-main-layout')[0];
    aside.addEventListener("transitionend", ()=>{
      aside.classList.remove('animation');
      mainLayout.classList.remove('animation');
      console.log("transsition end");
    }, false);
    aside.classList.add('animation');
    mainLayout.classList.add('animation')
    if (!this.isShowSidebar) {
      body.classList.add('overflow-hidden');
      aside.classList.add('show');
      mainLayout.classList.add('show');
      this.isShowSidebar = true;
    } else {
      aside.classList.remove('show');
      mainLayout.classList.remove('show');
      body.classList.remove('overflow-hidden');
      this.isShowSidebar = false;
    }
  }

  public hideSideBar(): void{
    if(this.isShowSidebar){
      this.toggleSidebar();
    }
  }
}
