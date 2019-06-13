import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlSegmentGroup, Route, UrlMatcher, NavigationStart } from '@angular/router';
import { ArticleDetailPageComponent } from './pages/article-detail-page/article-detail-page.component';
import { ArticleListPageComponent } from './pages/article-list-page/article-list-page.component';


import Utils from 'src/app/shared/helpers/utils';

export function articleMatcher1(key: string): UrlMatcher {
  // console.log(" check matrcher 1" + key)
  return (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
    const analystSlug = Utils.cutSlug(segments[0].path, key);
    if (analystSlug) {
      return { consumed: [segments[0]] };
    } else {
      return null;
    }
	};
}


export function articleMatcher(segments: UrlSegment[], group: UrlSegmentGroup, route: Route) {
    // console.log("check matrcher va co parent" + route.data.key);
    const analystSlug = Utils.cutSlug(segments[0].path, route.data.key);
    if (analystSlug) {
      return { consumed: [segments[0]] };
    } else {
      return null;
      
    }
 
}



export const routes: Routes = [
  { path: ':slugPost', matcher: articleMatcher, component: ArticleDetailPageComponent, data: { key: '-i' } }, // 2 lần
  { path: ':slug',  matcher: articleMatcher, component: ArticleListPageComponent, data: { key: '-cat' } }, // 4 lần
  // { path: ':slug',  matcher: articleMatcher, component: ArticleListPageComponent , data: { key: '-xxx' } }, // 6 lần

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {


}

