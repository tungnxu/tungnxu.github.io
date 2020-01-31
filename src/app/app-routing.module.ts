import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/authguard.guard';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,  children: [
      {
        path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), //canActivate: [AuthGuard]
      },
      { path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
      { path: '', loadChildren: () => import('./modules/article/article.module').then(m => m.ArticleModule) },
      { path: 'manage', loadChildren: () => import('./modules/management/management.module').then(m => m.ManagementModule) , canActivate: [AuthGuard]}
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration : 'enabled'  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
