import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-image-shell',
  templateUrl: './image-shell.component.html',
  styleUrls: [
    './image-shell.component.scss'
  ],
  // encapsulation: ViewEncapsulation.None
})
export class ImageShellComponent {
 
  @Input() public mode: number = 2; 
  _src = '';
  _alt = '';
  _class = '';
  _width ;
  _height ;

  @HostBinding('style.width')
  get widthBg(): string {

    return this.mode == 2 ? this._width : null;
  }

  @HostBinding('style.height')
  get heightBg(): string {
    return this.mode == 2 ? this._height : null;
  }

  // @HostBinding('class.is-bg-image') 
  // isOnBgImage: boolean = true;
  @HostBinding('class') 
  get getClass():string {
    return this.mode == 2 ? this._class + ' is-bg-image' :  null;
  } 

  @HostBinding('class.img-loaded') imageLoaded = false;

  @Input()
  set class(val: string) {
    this._class = (val !== undefined && val !== null) ? val : '';
  }

  @Input()
  set src(val: string) {
    this._src = (val !== undefined && val !== null) ? val : '';
  }

  @Input()
  set alt(val: string) {
    this._alt = (val !== undefined && val !== null) ? val : '';
  }

  @Input()
  set width(val: string) {
    this._width = (val !== undefined && val !== null) ? val : null;
  }

  @Input()
  set height(val: string) {
    this._height = (val !== undefined && val !== null) ? val : null;
  }

  constructor( ) {
  }

  _imageLoaded() {
    this.imageLoaded = true;
  }

 
}