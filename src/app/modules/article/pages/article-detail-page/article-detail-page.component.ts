import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { QueryConfig } from 'src/app/shared/models/query.model';
import { CloudFilestoreApiService } from 'src/app/core/http/cloud-filestore-api.service';
import { PostModel, PostModelResponse } from 'src/app/shared/models/posts.model';

import Utils from 'src/app/shared/helpers/utils';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ModalGeneratorService, ModalOptions } from 'src/app/core/services/modal-generator.service';
import { CreatePostsPageComponent } from 'src/app/modules/management/pages/create-posts-page/create-posts-page.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailPageComponent implements OnInit {
  public post: PostModelResponse = {};
  private pathName: string;
  constructor(private cdRef: ChangeDetectorRef, private cloudFilestoreApiService: CloudFilestoreApiService, private activatedRoute: ActivatedRoute, private modalGeneratorService: ModalGeneratorService , private loadingBar: LoadingBarService) {
    this.pathName = window.location.pathname;
    this.loadingBar.start();
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
      this.loadingBar.complete();
      // this.cdRef.detectChanges();
      // console.log("ĐÃ cập nhật nội dung bài");
    });
  }

  public editPopup(){
    // let oldPost: PostModel = new PostModel();
    // oldPost = this.post;
    let oldPost: PostModel = { ... this.post };
    let modalOptions = new ModalOptions('Sửa bài viết', oldPost);
    modalOptions.cancelCallback = ()=>{
      this.modalGeneratorService.removeModal();
      console.log("Do After Close PopUP");
    }
    this.modalGeneratorService.addModal(ModalComponent, modalOptions);
    
  }

  

  

}
