import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LayoutService } from './core/services/layout-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'authen-app';
  constructor(private layoutService: LayoutService) {
  } 
  public toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  

}
