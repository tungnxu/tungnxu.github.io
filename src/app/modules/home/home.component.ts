import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalGeneratorService, ModalOptions } from 'src/app/core/services/modal-generator.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CategoryModel } from 'src/app/shared/models/categories.model';
import { CategoryService } from 'src/app/core/mocks/categories_data';
import Utils from 'src/app/shared/helpers/utils';
import { LayoutService } from 'src/app/core/services/layout-service.service';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  // private item$: Observable<any>;

  public categories$: Observable<CategoryModel[]>;
  constructor(private modalGeneratorService: ModalGeneratorService, private categoryService: CategoryService, private layoutService : LayoutService, private seo: SeoService) { 
    // this.item$ = this.cloudFilestoreApiService.get('users');
  }

  ngOnInit() {
    this.categories$ = this.categoryService.get();
  }

  addModal() {
    const modalOptions = new ModalOptions('BÀI VIẾT MỚI','Modal example body');
    this.modalGeneratorService.addModal(ModalComponent, modalOptions);
  }

  public showSlugSEO(str: string): string{
    return str? Utils.slugify(str)+'-cat.': ""+'-cat.';
  }

  // public addItem(){
  //   this.cloudFilestoreApiService.create('users', {
  //     email: 'email@mail.com',
  //     avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  //     password:'123456',
  //     username: 'email moi'
  //   })
  // }

  public toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

}
