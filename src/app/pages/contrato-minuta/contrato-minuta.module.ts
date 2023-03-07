import { NgModule } from '@angular/core';

import { ContratoMinutaRoutingModule } from './contrato-minuta-routing.module';
import {
  PoPageDynamicEditModule,
  PoPageDynamicTableModule,
} from '@po-ui/ng-templates';
import { ContratoMinutaListComponent } from './contrato-minuta-list/contrato-minuta-list.component';
import { ContratoMinutaEditComponent } from './contrato-minuta-edit/contrato-minuta-edit.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ContratoMinutaListComponent, ContratoMinutaEditComponent],
  imports: [
    SharedModule,
    PoPageDynamicTableModule,
    PoPageDynamicEditModule,
    ContratoMinutaRoutingModule,
  ],
})
export class ContratoMinutaModule {}
