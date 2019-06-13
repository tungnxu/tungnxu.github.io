import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { CategoryService } from 'src/app/core/mocks/categories_data';
import { CategoryModel } from '../../models/categories.model';
import { Observable } from 'rxjs';
import Utils from '../../helpers/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: any;
  public categories$: Observable<CategoryModel[]>;
  constructor(private authenticationService: AuthenticationService, private categoryService: CategoryService) {
    this.authenticationService.currentUser$.subscribe(user => this.user = user);
   }

  ngOnInit() {
    this.categories$ = this.categoryService.get();
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public showSlugSEO(str: string): string{
    return str? Utils.slugify(str)+'-cat.': ""+'-cat.';
  }

}
