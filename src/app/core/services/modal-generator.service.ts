import { Injectable, ComponentFactoryResolver, Injector, EmbeddedViewRef, ApplicationRef, Renderer2 } from '@angular/core';
export class ModalOptions {
    title: string;
    data: any;
    acceptCallback?: (close: () => any) => any;
    cancelCallback?: (close: () => any) => any;
  
    constructor(title, data) { 
      this.title = title;
      this.data = data;
    }
  }
  

@Injectable({
  providedIn: 'root'
})
export class ModalGeneratorService {

  componentRef: any = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector
              ) { }

  addModal(ModalComponent, modalOptions: ModalOptions) {
    this.removeModal();

    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.componentRef = factory.create(this.injector);
    
    this.appRef.attachView(this.componentRef.hostView);

    this.componentRef.instance.modalOptions = modalOptions;
    
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    
    document.body.appendChild(domElem);
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('overflow-hidden');

  }

  removeModal() {
    if(this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('overflow-hidden');
    }
  }
}