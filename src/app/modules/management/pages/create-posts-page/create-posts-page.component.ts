import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { PostModel } from 'src/app/shared/models/posts.model';
import { CloudFilestoreApiService } from 'src/app/core/http/cloud-filestore-api.service';
import { CategoryModel } from 'src/app/shared/models/categories.model';
import Utils from 'src/app/shared/helpers/utils';
import { CategoryService } from 'src/app/core/mocks/categories_data';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-create-posts-page',
  templateUrl: './create-posts-page.component.html',
  styleUrls: ['./create-posts-page.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CreatePostsPageComponent implements OnInit {
  public newPost: PostModel = {};
  public categories: CategoryModel[];
  public selectedCat: string;
  public slugPost: string;
  public myDomain: string;

  public configEditor = {
    counter: { container: '#counter', unit: 'word' },
  };

  constructor(private cloudFilestoreApiService: CloudFilestoreApiService,
    private categoriesService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore) {
    this.loadCategory();
    // this.route.params.subscribe(params => {
    //   if(params['slug']) {
    //     console.log(params['slug']);
    //     //TODO; get data and biding to edit + change mode to edit
    //   }
    // })
  }

  ngOnInit() {
    this.myDomain = window.location.protocol + '//' + window.location.host + '/';
    var dateObj = new Date();
    var minutes = dateObj.getUTCMinutes();
    this.slugPost = minutes + Math.floor(100000 + Math.random() * 900000).toString().slice(-4);
  }

  onSubmit() {
    const postPayload: PostModel = {
      ...this.newPost,
      slug: this.slugPost,
      createdDate: new Date(Date.now()),
      categoryName: this.categories.find(c => c.categorySlug == this.selectedCat).categoryName,
      categorySlug: this.selectedCat,
      readingTime: 15
    };
    const addPost = this.cloudFilestoreApiService.create("posts", postPayload);
    addPost.then(res => {
      console.log("tao bai viet mowis thanh cong" + res);
      this.router.navigate(['/' + this.showSlugSEO(this.newPost.title) + this.slugPost], { relativeTo: this.route });
    }).catch(reject => {
      console.log("bi tu choi" + reject);
    })

  }



  private loadCategory(): void {
    // const categoryQuery: QueryConfig = {
    //   limit: 15,
    //   path: 'categories',
    // }

    // this.cloudFilestoreApiService.get(categoryQuery).subscribe(cats => {
    //   this.categories = cats;
    // });
    this.categoriesService.get().subscribe(cats => {
      this.categories = cats;
    })

  }

  public changeTitle($event) {

  }

  public showSlugSEO(str: string): string {

    return str ? Utils.slugify(this.newPost.title) + '-i.' : "" + '-i.';
  }

  public changeContent($event): void {
    this.newPost.body = $event;
  }

  public getData() {
    this.db.collection<PostModel>('posts').snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).subscribe(theData => {
        var theJSON = JSON.stringify(theData);
        var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);

        var a = document.createElement('a');
        a.href = uri;
        a.innerHTML = "Right-click and choose 'save as...'";
        document.body.appendChild(a);
      })
  }


  public find(items, text) {
    text = text.split(' ');
    return items.filter(function (item) {
      return text.every(function (el) {
        return item.content.indexOf(el) > -1;
      });
    });
  }


}
