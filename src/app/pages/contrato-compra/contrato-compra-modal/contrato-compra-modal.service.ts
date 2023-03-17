import { ComponentRef, Injectable } from '@angular/core';
import { PoModalAction } from '@po-ui/ng-components';
import { ComponentInjectorService } from 'src/app/services/component-injector.service';
import { ContratoCompraModalComponent } from './contrato-compra-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ContratoCompraModalService {
  private componentRef!: ComponentRef<ContratoCompraModalComponent>;

  constructor(private componentInjector: ComponentInjectorService) {}

  open(primaryAction: PoModalAction, model: any, items: any[]): void {
    this.componentRef = this.componentInjector.createComponentInApplication(
      ContratoCompraModalComponent
    );
    this.componentRef.changeDetectorRef.detectChanges();
    this.componentRef.instance.open(primaryAction, model, items);
  }

  getInstance() {
    return this.componentRef.instance;
  }
}
