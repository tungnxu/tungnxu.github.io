import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PostCardComponent } from './components/post-card/post-card.component';
import { TquillEditorComponent } from './components/tquill-editor/tquill-editor.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { EditPostPanelComponent } from './components/edit-post-panel/edit-post-panel.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ImageShellComponent } from './components/image-shell/image-shell.component';

const exportComponent = [
  HeaderComponent, FooterComponent, PostCardComponent, TquillEditorComponent, EditPostPanelComponent, SearchBarComponent, ImageShellComponent
];

@NgModule({
  declarations: [exportComponent, ModalComponent ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    QuillModule.forRoot(),
  ],
  exports: [exportComponent],
  entryComponents: [ModalComponent, EditPostPanelComponent]
})
export class SharedModule { }
