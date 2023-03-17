import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentInjectorService {
  constructor(
    private componentResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {}

  // Cria um dinamicamente no ApplicationRef
  createComponentInApplication(component: any): ComponentRef<any> {
    const componentRef = this.componentResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    this.applicationRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0];
    document.body.appendChild(domElem);
    return componentRef;
  }

  // Destrói o componente e remove do ApplicationRef
  destroyComponentInApplication(componentRef: any): void {
    this.applicationRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
