import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostModel } from '../../models/posts.model';
import { CategoryModel } from '../../models/categories.model';
import { CloudFilestoreApiService } from 'src/app/core/http/cloud-filestore-api.service';
import { CategoryService } from 'src/app/core/mocks/categories_data';
import { Router, ActivatedRoute } from '@angular/router';
import Utils from '../../helpers/utils';
import { ModalOptions, ModalGeneratorService } from 'src/app/core/services/modal-generator.service';

enum PostMode {
  EditMode = 1,
  AddMode = 2
}

@Component({
  selector: 'edit-post-panel',
  templateUrl: './edit-post-panel.component.html',
  styleUrls: ['./edit-post-panel.component.scss']
})
export class EditPostPanelComponent implements OnInit {
  public modalOptions: ModalOptions;
  @Input() public newPost: PostModel = {};
  @Output() public doneNow : EventEmitter<any> = new EventEmitter<any>();
  public categories: CategoryModel[];
  public selectedCat: string;
  public slugPost: string;
  public myDomain: string;
  public numOfWord: number;
  public mode: PostMode = PostMode.AddMode;

  public configEditor = {
    counter: { container: '#counter', unit: 'word' },
  };

  constructor(private cloudFilestoreApiService: CloudFilestoreApiService,
    private categoriesService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private modalGeneratorService: ModalGeneratorService) {
    this.loadCategory();

  }

  ngOnInit() {
    this.myDomain = window.location.protocol + '//' + window.location.host + '/';
    if (this.newPost.id) {
      console.log(this.newPost.id)
    this.mode = PostMode.EditMode;
      this.slugPost = this.newPost.slug;
      this.selectedCat = this.newPost.categorySlug;
    } else {
      var dateObj = new Date();
      var minutes = dateObj.getUTCMinutes();
      this.slugPost = minutes + Math.floor(100000 + Math.random() * 900000).toString().slice(-4);
    }
  }

  onSubmit() {
    const postPayload: PostModel = {
      ...this.newPost,
      slug: this.slugPost,
      createdDate: new Date(Date.now()),
      categoryName: this.categories.find(c => c.categorySlug == this.selectedCat).categoryName,
      categorySlug: this.selectedCat,
      readingTime: Math.ceil(this.numOfWord / 200)
    };

    if(this.mode == PostMode.AddMode){
      this.doAddpost(postPayload);
    }else{
      this.doEditPost(postPayload);
    }
  }

  private doAddpost(postPayload: PostModel) {
    const addPost = this.cloudFilestoreApiService.create("posts", postPayload);
    addPost.then(res => {
      console.log("tao bai viet mowis thanh cong" + res);
      this.router.navigate(['/' + this.showSlugSEO(this.newPost.title) + this.slugPost], { relativeTo: this.route });
      this.doneNow.emit();
    }).catch(reject => {
      console.log("bi tu choi" + reject);
    })
  }

  private doEditPost(postPayload: PostModel){
    const editPost = this.cloudFilestoreApiService.update("posts", postPayload);
    editPost.then(res => {
      console.log("sửa bài thành công" + res);
      this.router.navigate(['/' + this.showSlugSEO(this.newPost.title) + this.slugPost], { relativeTo: this.route });
      this.doneNow.emit();
    }).catch(reject => {
      console.log("bi tu choi" + reject);
    })
  }



  private loadCategory(): void {
    this.categoriesService.get().subscribe(cats => {
      this.categories = cats;
    })

  }


  public showSlugSEO(str: string): string {

    return str ? Utils.slugify(this.newPost.title) + '-i.' : "" + '-i.';
  }

  public changeContent($event): void {
    this.newPost.body = $event.html;
    this.numOfWord = $event.words;
  }

}
