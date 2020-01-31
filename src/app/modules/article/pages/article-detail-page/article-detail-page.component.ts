import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { QueryConfig } from 'src/app/shared/models/query.model';
import { CloudFilestoreApiService } from 'src/app/core/http/cloud-filestore-api.service';
import { PostModel, PostModelResponse } from 'src/app/shared/models/posts.model';
import mediumZoom from 'medium-zoom';
import hljs from 'highlight.js';

import Utils from 'src/app/shared/helpers/utils';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ModalGeneratorService, ModalOptions } from 'src/app/core/services/modal-generator.service';
import { CreatePostsPageComponent } from 'src/app/modules/management/pages/create-posts-page/create-posts-page.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { EditPostPanelComponent } from 'src/app/shared/components/edit-post-panel/edit-post-panel.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';



@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailPageComponent implements OnInit {
  public post: PostModelResponse = {};
  private pathName: string;
  public contentHtml: any;
  constructor(private cdRef: ChangeDetectorRef, private cloudFilestoreApiService: CloudFilestoreApiService, private activatedRoute: ActivatedRoute, private modalGeneratorService: ModalGeneratorService , private loadingBar: LoadingBarService, private sanitized: DomSanitizer, private seo: SeoService) {
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
      // let re = /\src/g;
      this.contentHtml = this.post.body.split("src").join("data-src");
      this.contentHtml = this.sanitized.bypassSecurityTrustHtml(this.contentHtml);
      this.loadingBar.complete();
      this.cdRef.detectChanges();

      mediumZoom('[data-zoomable]', {
        margin: 52,
        // background: '#BADA55'
      })

        
      this.applyLazyLoad();
      this.styleCode();
      // console.log("ĐÃ cập nhật nội dung bài");
    });
  }

  private styleCode() {
    document.querySelectorAll('pre').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  private applyLazyLoad() {
    var targets = document.querySelectorAll('[data-src]');
    const lazyLoad = target => {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
    
            img.setAttribute('src', src);
            img.classList.add('fade');
    
            observer.disconnect();
          }
        });
      });
    
      io.observe(target)
    };
    targets.forEach(lazyLoad);
  }

  public editPopup(){
    // let oldPost: PostModel = new PostModel();
    // oldPost = this.post;
    let oldPost: PostModel = { ... this.post };
    let modalOptions = new ModalOptions('Sửa bài viết', oldPost);
    modalOptions.template = EditPostPanelComponent;
    modalOptions.cancelCallback = ()=>{
      console.log("Do After Close PopUP");
    }
    this.modalGeneratorService.addModal(ModalComponent, modalOptions);
    
  }

  

  

}
