import { Component, OnInit, Inject, HostListener, ViewEncapsulation } from '@angular/core';
import { fadeAnimation } from 'src/app/shared/animations/animations';
import { DOCUMENT } from '@angular/common';
import { LayoutService } from '../../services/layout-service.service';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation] 
})
export class MainLayoutComponent implements OnInit {
  previousPosition: number = 0;
  constructor(@Inject(DOCUMENT) document, private layoutService: LayoutService) { }

  ngOnInit() {
  }

  public toggleSidebar() {
    this.layoutService.hideSideBar();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    
    
    //  if (window.pageYOffset > 550) {
    //   //  let element = document.getElementById('navbar');
  
    //   if(window.pageYOffset > this.previousPosition ){
    //     console.log("keos xuoongs");
    //   }else{
    //     console.log("keo len");
    //   }
    //   this.previousPosition = window.pageYOffset;
    //  } else {
    //   // let element = document.getElementById('navbar');
    //  }
  }

}
