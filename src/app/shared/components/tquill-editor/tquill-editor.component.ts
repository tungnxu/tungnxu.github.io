import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import * as hljs from 'highlight.js';
import Quill, { Delta } from 'quill';


import Counter from './toolbar/counter'
import ImageResize from 'quill-image-resize-module'
import ImageInsert from './toolbar/imageInsert'

import ImageBlot  from './toolbar/imageBlot';
import { TaskerFigure } from './toolbar/TaskerFigure';
import { FigureOptions } from './toolbar/FigureOptions';

// hljs.configure({
//   languages: ['javascript', 'html', 'bash']
// });

ImageBlot['blotName'] = 'imageBlot';
ImageBlot['className'] = 'image-lazy';
ImageBlot['tagName'] = 'img';

Quill.register('formats/imageBlot', ImageBlot );

Quill.register('modules/counter', Counter)
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageInsert', ImageInsert)

Quill.register(TaskerFigure);
// Quill.register('modules/figureOptions', FigureOptions);

@Component({
  selector: 'tquill-editor',
  templateUrl: './tquill-editor.component.html',
  styleUrls: ['./tquill-editor.component.scss']
})
export class TquillEditorComponent implements OnInit {
  @Output() public modelChange: EventEmitter<any> = new EventEmitter();
  @Input() public model: string;
  @Input() public placeholder: string;
  public configEditor = {
    imageResize: {},
    syntax: true,
    counter: { container: '#counter', unit: 'word' },
    imageInsert: { container: '#imgInsert', unit: 'word' },
 
  };

  public editorInstance;
  created(editorInstance) {
    this.editorInstance = editorInstance;
  }

  constructor() { 

  }

  ngOnInit() {
    
  }

  public onModelChange(html: string) {
    // const plainText = this.nativeEditor.elementRef.nativeElement.textContent;
    // this.plainTextChange.emit(plainText);
    // console.log(this.editorInstance);
    let words = this.editorInstance.numOfWord;
    this.modelChange.emit({html, words});
  }

  public logSelection($event) {
    // console.log(event);
    // var range = this.editorInstance.getSelection();
    // if (range) {
    //   if (range.length == 0) {
    //     console.log('User cursor is at index', range.index);
    //   } else {
    //     var text = this.editorInstance.getText(range.index, range.length);
    //     console.log('User has highlighted: ', text);
    //   }
    // } else {
    //   console.log('User cursor is not in editor');
    // }
  }

  public sourceChange():void {
    event.preventDefault();
    var htmlEditor: HTMLTextAreaElement = document.querySelector('.ql-html-editor');
    if (htmlEditor){
      this.editorInstance.pasteHTML(htmlEditor.value,'user');
      this.editorInstance.container.removeChild(htmlEditor);
     }else{
       const options = {
        "indent":"auto",
        "indent-spaces":1,
        "wrap":280,
        "markup":true,
        "output-xml":false,
        "numeric-entities":true,
        "quote-marks":true,
        "quote-nbsp":false,
        "show-body-only":true,
        "quote-ampersand":false,
        "break-before-br":true,
        "uppercase-tags":false,
        "uppercase-attributes":false,
        "drop-font-tags":true,
        "tidy-mark":false
      }
      let htmlEditor = document.createElement("textarea");
    htmlEditor.className = 'ql-editor ql-html-editor';
    htmlEditor.style.cssText = 'margin-top: 0px; resize: none; margin-bottom: 0px;position: absolute;top: 0px;width: 100%;height: 100%;background: #fafafa;';
    htmlEditor.innerHTML = this.editorInstance.root.innerHTML;
    // htmlEditor.innerHTML = tidy_html5(this.editorInstance.root.innerHTML, options).replace(/\n\n/g, "\n");
    this.editorInstance.container.appendChild(htmlEditor);
    }

    
    
  }

  public insertImage(): void {
    event.preventDefault();

    var range = this.editorInstance.getSelection();
    if (range) {
      if (range.length == 0) {
        // console.log('User cursor is at index', range.index);
      } else {
        var text = this.editorInstance.getText(range.index, range.length);
        // console.log('User has highlighted: ', text);
      }
    } else {
      range = this.editorInstance.scroll.length();
      // console.log('User cursor is not in editor' + range);
    }
    var value = prompt('What is the image URL');
    if(value)  this.editorInstance.insertEmbed(range, 'imageBlot', value, 'user');

    // if(value)  this.editorInstance.insertEmbed(range, 'imageBlot', 
    // {
    //   src: value, // any url
    //   custom: 'hello-' + Date.now(), // any custom attr
    // }
    // , 'user');
   
    // this.editorInstance.insertText(0, `<b>Hello</b>`,'normal', 'user');
    // let imgBuild = "<figure></figure>"
    // this.editorInstance.pasteHTML( imgBuild, 'user');
    // this.modelChange.emit(this.model);
    // this.editorInstance.setText('Hello\n');
  }

  public insertImageCap(): void {
    event.preventDefault();

    var range = this.editorInstance.getSelection();
    if (range) {
      if (range.length == 0) {
        // console.log('User cursor is at index', range.index);
      } else {
        var text = this.editorInstance.getText(range.index, range.length);
        // console.log('User has highlighted: ', text);
      }
    } else {
      range = this.editorInstance.scroll.length();
      // console.log('User cursor is not in editor' + range);
    }
    var value = prompt('What is the image URL');
    if(value)  this.editorInstance.insertEmbed(range, 'taskerFigure', {
       url : value,
       name: 'Caption of image'
    }, 'user');

    // if(value)  this.editorInstance.insertEmbed(range, 'imageBlot', 
    // {
    //   src: value, // any url
    //   custom: 'hello-' + Date.now(), // any custom attr
    // }
    // , 'user');
   
    // this.editorInstance.insertText(0, `<b>Hello</b>`,'normal', 'user');
    // let imgBuild = "<figure></figure>"
    // this.editorInstance.pasteHTML( imgBuild, 'user');
    // this.modelChange.emit(this.model);
    // this.editorInstance.setText('Hello\n');
  }

}
