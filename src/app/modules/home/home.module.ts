import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RecentPostsListComponent } from './components/recent-posts-list/recent-posts-list.component';
import { FeaturePostsListComponent } from './components/feature-posts-list/feature-posts-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManagementModule } from '../management/management.module';

@NgModule({
  declarations: [HomeComponent, RecentPostsListComponent, FeaturePostsListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
})
export class HomeModule { }
