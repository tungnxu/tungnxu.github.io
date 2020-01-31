import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PostModel, PostListViewModel, PostModelResponse } from 'src/app/shared/models/posts.model';
import { QueryConfig } from 'src/app/shared/models/query.model';
import { PostService } from '../../services/post.service';
import { CloudFilestorePaginationService } from 'src/app/core/http/cloud-filestore-pagination.service';
import { map, take, delay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recent-posts-list',
  templateUrl: './recent-posts-list.component.html',
  styleUrls: ['./recent-posts-list.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class RecentPostsListComponent implements OnInit {

  _class = '';
  @Input() set class(val: string) { this._class = (val !== undefined && val !== null) ? val : ''; }
  @HostBinding('class') get getClass(): string { return this._class; }

  private item$: Observable<PostModelResponse[]>;
  private postService: CloudFilestorePaginationService;
  public recentPosts: PostListViewModel[];
  subscriptions: Subscription[] = [];
  constructor(private db: AngularFirestore, route: ActivatedRoute) {
    route.params.subscribe(val => {

      if (this.postService) { this.postService.disposeService(); }
      this.postService = new CloudFilestorePaginationService(this.db);

      const postQuery: QueryConfig = {
        limit: 6,
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
          this.recentPosts = data;
        }
        ))
    });



  }

  ngOnInit() {

  }

  trackByFn(index, item) {
    return index;
  }



  public loadMore() {
    this.postService.loadMore();
  }


  ngOnDestroy(): void {
    if (this.postService) this.postService.disposeService();
    if (this.subscriptions) this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.postService = null;
    console.log("Desatroi com");
  }



}
