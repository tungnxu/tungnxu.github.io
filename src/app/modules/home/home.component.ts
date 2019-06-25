import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalGeneratorService, ModalOptions } from 'src/app/core/services/modal-generator.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // private item$: Observable<any>;
  constructor(private modalGeneratorService: ModalGeneratorService) { 
    // this.item$ = this.cloudFilestoreApiService.get('users');
  }

  ngOnInit() {
  }

  addModal() {
    const modalOptions = new ModalOptions('BÀI VIẾT MỚI','Modal example body');
    this.modalGeneratorService.addModal(ModalComponent, modalOptions);
  }

  // public addItem(){
  //   this.cloudFilestoreApiService.create('users', {
  //     email: 'email@mail.com',
  //     avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  //     password:'123456',
  //     username: 'email moi'
  //   })
  // }

}
