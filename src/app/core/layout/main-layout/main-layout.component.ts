import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [fadeAnimation] 
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
