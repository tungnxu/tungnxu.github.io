import { Component, OnInit } from '@angular/core';
import { QueryConfig } from 'src/app/shared/models/query.model';
import { CloudFilestoreApiService } from 'src/app/core/http/cloud-filestore-api.service';
import { PostModel, PostModelResponse } from 'src/app/shared/models/posts.model';

import Utils from 'src/app/shared/helpers/utils';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss']
})
export class ArticleDetailPageComponent implements OnInit {
  public post: PostModelResponse = {};
  private pathName: string;
  constructor(private cloudFilestoreApiService: CloudFilestoreApiService, private activatedRoute: ActivatedRoute ) {
    this.pathName = window.location.pathname;
   }

  ngOnInit() {
    let codeQuery = this.pathName.split(".", 2)[1]; 
     const postQuery: QueryConfig = {
      limit: 1,
      where: [{field: 'slug', operator: '==', value: codeQuery }],
      path: 'posts',
    }

    this.cloudFilestoreApiService.get(postQuery).pipe(take(1)).subscribe(post => {
      this.post = post[0];
    });
  }

  

}
