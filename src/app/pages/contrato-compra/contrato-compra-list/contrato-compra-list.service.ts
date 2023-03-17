import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ChangeDetectorRef,
  ComponentRef,
  Injectable,
  ViewChild,
} from '@angular/core';
import { PoModalAction, PoNotificationService } from '@po-ui/ng-components';
import { PoPageDynamicTableMetaData } from '@po-ui/ng-templates';
import { take } from 'rxjs';
import { ContratoCompraListComponent } from './contrato-compra-list.component';
import { ComponentInjectorService } from 'src/app/services/component-injector.service';
import { ContratoCompraModalComponent } from '../contrato-compra-modal/contrato-compra-modal.component';
import { ContratoCompraModalService } from '../contrato-compra-modal/contrato-compra-modal.service';

interface ContratoCompra {
  id: number;
  emissao: string;
  contratoMinuta: ContratoMinuta;
}

interface ContratoMinuta {
  id: number;
}

const headers = new HttpHeaders({
  'x-po-screen-lock': 'true',
});

@Injectable({
  providedIn: 'root',
})
export class ContratoCompraListService {
  public serviceApi = '/siagro/api/contrato-compra';

  public model: any = {};
  public coletas: any[] = [];

  private metadata: PoPageDynamicTableMetaData = {
    title: 'Contratos de Compra',
    autoRouter: true,
    keepFilters: true,
    breadcrumb: {
      items: [
        {
          label: 'Home',
          link: '/home',
        },
        {
          label: 'Contratos de Compra',
        },
      ],
    },
    actions: {
      new: 'contrato-compra/new',
      edit: 'contrato-compra/edit/:id',
      remove: true,
    },
    tableCustomActions: [
      {
        label: 'Gerar Contrato',
        action: this.onDoContract.bind(this),
        icon: 'po-icon po-icon-document-filled',
      },
    ],
    fields: [
      {
        property: 'id',
        label: 'Codigo',
        key: true,
        visible: true,
        allowColumnsManager: true,
        width: '50px',
      },
      {
        property: 'numero',
        label: 'Numero',
        filter: true,
        allowColumnsManager: true,
        gridColumns: 6,
        width: '100px',
      },
      {
        property: 'emissao',
        label: 'Emissao',
        type: 'date',
        allowColumnsManager: true,
        width: '100px',
      },
      {
        property: 'dataInicioEntrega',
        label: 'Emissão Inicial',
        type: 'date',
        filter: true,
        visible: false,
        gridColumns: 6,
        width: '100px',
      },
      {
        property: 'dataTerminoEntrega',
        label: 'Emissão Final',
        type: 'date',
        filter: true,
        visible: false,
        gridColumns: 6,
        width: '100px',
      },
      // {
      //   property: 'produtoId',
      //   label: 'Produto',
      //   filter: true,
      //   visible: false,
      //   searchService: '/siagro/api/produtos',
      //   columns: [
      //     {
      //       property: 'descricao',
      //       label: 'Descricao',
      //     },
      //     {
      //       property: 'codigo',
      //       label: 'Codigo',
      //     },
      //   ],
      //   fieldValue: 'id',
      //   fieldLabel: 'descricao',
      //   format: ['descricao', 'codigo'],
      //   gridColumns: 6,
      // },
      {
        property: 'unidadeMedida.id',
        label: 'Und.Med.',
        allowColumnsManager: true,
        width: '50px',
      },
      {
        property: 'quantidade',
        label: 'Quantidade',
        type: 'number',
        width: '100px',
        format: '1.3',
      },
      {
        property: 'saldo',
        label: 'Saldo',
        type: 'number',
        width: '100px',
        format: '1.3',
      },
    ],
  };

  contratoCompraModalPrimaryAction: PoModalAction = {
    label: 'Salvar',
    action: () => this.saveOrder(),
  };

  saveOrder() {}

  constructor(
    private http: HttpClient,
    private poNotification: PoNotificationService,
    private contratoCompraModalService: ContratoCompraModalService
  ) {}

  onDoContract(contratoCompra: ContratoCompra) {
    //console.log(JSON.stringify(contratoCompra.contratoMinuta.id));
    const response = this.http
      .get(this.serviceApi + `/doContract/${contratoCompra.id}`, { headers })
      .pipe(take(1));
    //console.log('onDoContract');
    response.subscribe((data) => {
      console.log(JSON.stringify(data));

      const { ...rest } = data;
      this.model = rest;
      this.contratoCompraModalService.open(
        this.contratoCompraModalPrimaryAction,
        this.model,
        this.coletas
      );
    });
  }

  public getMetadata() {
    return this.metadata;
  }
}
