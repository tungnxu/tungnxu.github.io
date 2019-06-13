import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PostCardComponent } from './components/post-card/post-card.component';
import { TquillEditorComponent } from './components/tquill-editor/tquill-editor.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';

const exportComponent = [
  HeaderComponent, FooterComponent, PostCardComponent, TquillEditorComponent
];

@NgModule({
  declarations: [exportComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    QuillModule.forRoot(),
  ],
  exports: [exportComponent],
})
export class SharedModule { }
