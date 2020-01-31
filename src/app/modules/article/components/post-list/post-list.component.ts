import { Component, OnInit, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CloudFilestorePaginationService } from 'src/app/core/http/cloud-filestore-pagination.service';
import { Observable, Subscription } from 'rxjs';
import { PostModel, PostListViewModel, PostModelResponse } from 'src/app/shared/models/posts.model';
import { QueryConfig } from 'src/app/shared/models/query.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})
export class PostListComponent implements OnInit {
  @Input() private codeQuery: string;
  private item$: Observable<PostModelResponse[]>;
  subscriptions: Subscription[]=[];
  public listPosts: PostListViewModel[];
  private postService: CloudFilestorePaginationService;
  constructor(private db: AngularFirestore, private loadingBar: LoadingBarService) {
  //  this.postService = new CloudFilestorePaginationService(this.db);
   }

   ngOnChanges(changes: SimpleChanges): void {
   
     if(this.postService) { this.postService.disposeService(); this.dispose() }
    this.postService = new CloudFilestorePaginationService(this.db);
     const postQuery: QueryConfig = {
      limit: 3,
      where: [{field: 'categorySlug', operator: '==', value: this.codeQuery}],
      orderBy: 'createdDate',
      path: 'posts',
      prepend: false,
      reverse: true, //true will show newest first
    }
    this.item$ = this.postService.get(postQuery);
    this.subscriptions.push( 
      this.item$.pipe(
      map(listPost => {
        let recentPostlst: PostListViewModel[] = [];
        listPost.forEach(post => {
          recentPostlst.push({
            id: post.id,
            slug: post.slug,
            summary: post.summary,
            thumbnail: post.thumbnail,
            title: post.title,
            categoryName: post.categoryName,
            categorySlug: post.categorySlug,
            readingTime: post.readingTime,
            createdDate: post.createdDate.toDate()
          })
        });
        return recentPostlst;
      })
      ).subscribe(data => {
        this.listPosts = data;
        this.loadingBar.complete();
      }
      )
    )
   }

  ngOnInit() {
    
  }

  trackByFn(index, item) {
    return index;
  }

  public loadMore() {
    this.postService.loadMore();
  }

  dispose(){
    this.subscriptions.forEach(subscription =>subscription.unsubscribe());
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    if(this.subscriptions)    this.subscriptions.forEach(subscription =>subscription.unsubscribe());
  }

}
