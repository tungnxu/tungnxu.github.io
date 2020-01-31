import { Component, OnInit, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ChangeDetectionStrategy } from '@angular/core';
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
  styleUrls: ['./modal.component.scss'],

})
export class ModalComponent implements OnInit {
  public close: boolean = false;
  public modalOptions: ModalOptions;
  constructor(private modalGeneratorService: ModalGeneratorService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }

  ngOnInit() {

  }


  renderWidgetInsideWidgetContainer() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.modalOptions.template);
    this.componentRef = factory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);
    this.componentRef.instance.modalOptions = this.modalOptions;
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    let templateArea = document.getElementById('template');
    templateArea.appendChild(domElem);
    let modal = document.getElementById('modal');
    modal.classList.add(... this.modalOptions.css);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderWidgetInsideWidgetContainer();
    }, 0);
  }

  closeModal() {
    if (this.modalOptions.cancelCallback) {
      this.close = true;
      setTimeout( () => { this.modalGeneratorService.removeModal(); }, 300 );
      this.modalOptions.cancelCallback(() => {
      });
    } else {
      // this.modalGeneratorService.removeModal();
      this.close = true;
      setTimeout( () => { this.modalGeneratorService.removeModal(); }, 300 );
    }

    // this.close = true;
    // setTimeout( () => { this.modalGeneratorService.removeModal(); }, 200 );

  }


  componentRef: any = null;



}
