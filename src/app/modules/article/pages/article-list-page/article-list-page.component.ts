import { Component, OnInit, ViewChild, ComponentRef } from '@angular/core';
import { CategoryModel } from 'src/app/shared/models/categories.model';
import { CategoryService } from 'src/app/core/mocks/categories_data';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit {
  @ViewChild('postList', { static: false }) public postList:ComponentRef<any> ;
  private pathName: string;
  public codeQuery: string;
  public category: CategoryModel;
  constructor(private categoryService: CategoryService, private route:ActivatedRoute, private router: Router, private loadingBar: LoadingBarService) { 
    this.route.url.subscribe(params => {
      this.loadingBar.start();
      this.pathName = window.location.pathname;
      this.codeQuery = this.pathName.split(".", 2)[1]; 
    this.categoryService.get().subscribe(cats => {
      this.category = cats.find(c => c.categorySlug == this.codeQuery);
    })
      // debugger;
      // console.log(params)
    })
   
  }

  ngOnInit() {
    
  }

}
