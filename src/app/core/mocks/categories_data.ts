import { CategoryModel } from "src/app/shared/models/categories.model";
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private categories: CategoryModel[] = [
        {id: '1', categoryName:'Kiến thức nền',categorySlug:'1', categoryImage: 'https://picsum.photos/100/100', categoryDesc:'Kiến thức nền' },
        {id: '2', categoryName:'UX-UI',categorySlug:'2', categoryImage: 'https://picsum.photos/100/100', categoryDesc:'Phân loại về UX UI' },
        {id: '3', categoryName:'Javascript',categorySlug:'3', categoryImage: 'https://picsum.photos/100/100', categoryDesc:'Phân loại về Javascript' },
        {id: '4', categoryName:'Angular',categorySlug:'4', categoryImage: 'https://picsum.photos/100/100', categoryDesc:'Phân loại về angular' },
      
    ]

    get() {
        return of(this.categories);
    }
}