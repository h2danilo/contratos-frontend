import { Injectable } from '@angular/core';
import { PoPageDynamicEditMetadata } from '@po-ui/ng-templates';
import { of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContratoMinutaEditService {
  private metadata: PoPageDynamicEditMetadata = {
    version: 1,
    title: 'Cadastro Minuta Contrato',
    breadcrumb: {
      items: [
        {
          label: 'Home',
          link: '/home',
        },
        {
          label: 'Minutas Contratos',
          link: '/contrato-minuta',
        },
        {
          label: 'Cadastro de Minuta Contrato',
        },
      ],
    },
    actions: {
      save: 'contrato-minuta',
      saveNew: 'contrato-minuta/new',
      cancel: true,
    },
    autoRouter: true,
    fields: [
      {
        property: 'id',
        label: 'Codigo',
        disabled: true,
        key: true,
        divider: 'Minuta',
      },
      {
        property: 'descricao',
        label: 'Descricao',
        required: true,
        maxLength: 100,
      },
      {
        property: 'inativo',
        label: 'Inativo ?',
        type: 'boolean',
        booleanFalse: 'NAO',
        booleanTrue: 'SIM',
      },
      // {
      //   property: 'minuta',
      //   label: 'Minutaaaa',
      //   required: true,
      // },
    ],
  };

  constructor() {}

  public getMetadata() {
    //return this.metadata;
    return of(this.metadata).pipe(take(1));
  }
}
