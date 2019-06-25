import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListPageComponent } from './pages/article-list-page/article-list-page.component';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementModule } from '../management/management.module';


@NgModule({
  declarations: [ArticleListPageComponent,ArticleDetailPageComponent, PostListComponent  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    ManagementModule
  ],
  entryComponents: [
    ArticleListPageComponent,ArticleDetailPageComponent
  ]
})
export class ArticleModule { }
