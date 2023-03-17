import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'contrato-minuta',
    loadChildren: () =>
      import('./pages/contrato-minuta/contrato-minuta.module').then(
        (x) => x.ContratoMinutaModule
      ),
  },
  {
    path: 'contrato-compra',
    loadChildren: () =>
      import('./pages/contrato-compra/contrato-compra.module').then(
        (x) => x.ContratoCompraModule
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
