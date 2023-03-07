import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratoMinutaEditComponent } from './contrato-minuta-edit/contrato-minuta-edit.component';
import { ContratoMinutaListComponent } from './contrato-minuta-list/contrato-minuta-list.component';

const routes: Routes = [
  {
    path: '',
    component: ContratoMinutaListComponent,
  },
  {
    path: 'new',
    component: ContratoMinutaEditComponent,
  },
  {
    path: 'edit/:id',
    component: ContratoMinutaEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratoMinutaRoutingModule {}
