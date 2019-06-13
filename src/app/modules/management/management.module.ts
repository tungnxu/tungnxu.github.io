import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagePostsPageComponent } from './pages/manage-posts-page/manage-posts-page.component';
import { CreatePostsPageComponent } from './pages/create-posts-page/create-posts-page.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [ManagePostsPageComponent, CreatePostsPageComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    CKEditorModule,
    SharedModule
  ]
})
export class ManagementModule { }
