import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagePostsPageComponent } from './pages/manage-posts-page/manage-posts-page.component';
import { CreatePostsPageComponent } from './pages/create-posts-page/create-posts-page.component';

import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [ManagePostsPageComponent, CreatePostsPageComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ManagementModule { }
