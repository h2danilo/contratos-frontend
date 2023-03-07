import { Injectable } from '@angular/core';
import { PoPageDynamicTableMetaData } from '@po-ui/ng-templates';

@Injectable({
  providedIn: 'root',
})
export class ContratoMinutaListService {
  private metadata: PoPageDynamicTableMetaData = {
    title: 'Minutas de Contrato',
    autoRouter: true,
    keepFilters: true,
    breadcrumb: {
      items: [
        {
          label: 'Home',
          link: '/home',
        },
        {
          label: 'Minutas de Contrato',
        },
      ],
    },
    actions: {
      new: '/contrato-minuta/new',
      edit: '/contrato-minuta/edit/:id',
      remove: true,
    },
    fields: [
      {
        property: 'id',
        label: 'Codigo',
        visible: true,
        allowColumnsManager: true,
        key: true,
      },
      {
        property: 'descricao',
        label: 'Descricao',
        filter: true,
        allowColumnsManager: true,
        width: '300px',
      },
      {
        property: 'inativo',
        label: 'Inativo ?',
        type: 'boolean',
        booleanFalse: 'NAO',
        booleanTrue: 'SIM',
      },
    ],
  };
  constructor() {}

  public getMetadata() {
    return this.metadata;
  }
}
