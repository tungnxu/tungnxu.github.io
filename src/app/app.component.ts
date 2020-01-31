import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LayoutService } from './core/services/layout-service.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CategoryModel } from './shared/models/categories.model';
import { CategoryService } from './core/mocks/categories_data';
import Utils from './shared/helpers/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public categories$: Observable<CategoryModel[]>;
  title = 'authen-app';
  constructor(private layoutService: LayoutService, private _router: Router, private categoryService: CategoryService) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const body = document.getElementsByTagName('body')[0];
        let element = document.getElementById('main-navigation');
        if (event.url == `/`) {
          body.classList.add(`home-page`);
        } else {
          body.classList.remove('home-page');
        }
        element.classList.add('show');
      }
    });
  }

  ngOnInit() {
    this.categories$ = this.categoryService.get();
  }

  public showSlugSEO(str: string): string{
    return str? Utils.slugify(str)+'-cat.': ""+'-cat.';
  }
  
  public toggleSidebar() {
    this.layoutService.toggleSidebar();
  }



}
