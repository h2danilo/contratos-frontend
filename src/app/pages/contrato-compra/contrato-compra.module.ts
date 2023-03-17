import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoCompraRoutingModule } from './contrato-compra-routing.module';
import { ContratoCompraListComponent } from './contrato-compra-list/contrato-compra-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  PoPageDynamicEditModule,
  PoPageDynamicTableModule,
} from '@po-ui/ng-templates';
import { ContratoCompraEditComponent } from './contrato-compra-edit/contrato-compra-edit.component';
import { ContratoCompraModalComponent } from './contrato-compra-modal/contrato-compra-modal.component';

@NgModule({
  declarations: [ContratoCompraListComponent, ContratoCompraEditComponent, ContratoCompraModalComponent],
  imports: [
    SharedModule,
    ContratoCompraRoutingModule,
    PoPageDynamicTableModule,
    PoPageDynamicEditModule,
  ],
})
export class ContratoCompraModule {}
