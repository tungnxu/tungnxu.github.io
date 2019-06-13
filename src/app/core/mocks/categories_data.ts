import { CategoryModel } from "src/app/shared/models/categories.model";
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private categories: CategoryModel[] = [
        {id: '1', categoryName:'Angular',categorySlug:'1', categoryImage: 'https://picsum.photos/100/100', categoryDesc:'Phân loại về angular' },
        {id: '2', categoryName:'UX-UI',categorySlug:'2', categoryImage: 'https://picsum.photos/100/100', categoryDesc:'Phân loại về UX UI' }
    ]

    get() {
        return of(this.categories);
    }
}