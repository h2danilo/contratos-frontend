import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratoCompraEditComponent } from './contrato-compra-edit/contrato-compra-edit.component';
import { ContratoCompraListComponent } from './contrato-compra-list/contrato-compra-list.component';

const routes: Routes = [
  {
    path: '',
    component: ContratoCompraListComponent,
  },
  {
    path: 'new',
    component: ContratoCompraEditComponent,
  },
  {
    path: 'edit/:id',
    component: ContratoCompraEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratoCompraRoutingModule {}
