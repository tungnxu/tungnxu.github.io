import { Component, OnInit } from '@angular/core';
import { ModalGeneratorService, ModalOptions } from 'src/app/core/services/modal-generator.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']

})
export class ModalComponent implements OnInit {
  public close: boolean = false;
  public modalOptions: ModalOptions;
  constructor(private modalGeneratorService: ModalGeneratorService) { }

  ngOnInit() { }

  closeModal() {
    if (this.modalOptions.cancelCallback) {
      this.modalOptions.cancelCallback(() => {
      });
    } else {
      this.modalGeneratorService.removeModal();
    }

    // this.close = true;
    // setTimeout( () => { this.modalGeneratorService.removeModal(); }, 200 );

  }

}
