import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../../models/posts.model';
import Utils from '../../helpers/utils';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() postInfo: PostModel = {}
  constructor() { }

  ngOnInit() {
  }

  public showSlugSEO(str: string): string{
    return str? Utils.slugify(this.postInfo.title)+'-i.': ""+'-i.';
  }

  public getDate(date : any):Date {
   return date.toDate();
  }
}
