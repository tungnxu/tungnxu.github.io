import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { PostModel } from '../../models/posts.model';
import Utils from '../../helpers/utils';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class PostCardComponent implements OnInit {
  @Input() postInfo: PostModel = {}
  @Input() index: number = 0;

  _class = '';
  @Input() set class(val: string) { this._class = (val !== undefined && val !== null) ? val : ''; }
  @HostBinding('class') get getClass(): string { return `${this._class} post-card-item flex md:block  rounded overflow-hidden shadow-md `; }
  
  @HostBinding('style.animation-delay')
  get widthAnimationDelay(): string {
    return this.index * (.03) + 's';
  }

  constructor() { }

  ngOnInit() {
  }

  public showSlugSEO(str: string): string {
    return str ? Utils.slugify(this.postInfo.title) + '-i.' : "" + '-i.';
  }

  public getDate(date: any): Date {
    return date.toDate();
  }
}
