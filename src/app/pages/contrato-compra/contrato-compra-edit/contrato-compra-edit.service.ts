import { Injectable } from '@angular/core';
import { of, take } from 'rxjs';

import * as dayjs from 'dayjs';
import { PoPageDynamicEditMetadata } from '@po-ui/ng-templates';
import { ForceOptionComponentEnum } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root',
})
export class ContratoCompraEditService {
  constructor() {}

  public getMetadata() {
    return of(this.metadata).pipe(take(1));
  }

  public getInitValues() {
    return of({
      emissao: dayjs().format('YYYY-MM-DD'),
      quantidade: 0,
      comissaoCorretor: 0,
      preco: 0,
      tipoFrete: 'FOB',
      modalidade: 'PRECO_FIXO',
      saldo: 0,
      frete: 0,
      quantidade2: 0,
    }).pipe(take(1));
  }

  private metadata: PoPageDynamicEditMetadata = {
    version: 1,
    title: 'Contrato de Compra',
    autoRouter: true,
    breadcrumb: {
      items: [
        {
          label: 'Home',
          link: '/home',
        },
        {
          label: 'Contratos de Compra',
          link: '/contrato-compra',
        },
        {
          label: 'Contrato de Compra',
        },
      ],
    },
    actions: {
      save: 'contrato-compra',
      saveNew: 'contrato-compra/new',
      cancel: true,
    },
    fields: [
      {
        property: 'id',
        label: 'Codigo',
        key: true,
        disabled: true,
        divider: 'Dados do Contrato',
      },
      // {
      //   property: 'filialId',
      //   label: 'Filial',
      //   required: true,
      //   searchService: '/siagro/api/filiais',
      //   params: {
      //     order: 'codFilial',
      //   },
      //   columns: [
      //     {
      //       property: 'codFilial',
      //       label: 'Filial',
      //     },
      //     {
      //       property: 'nomeFantasia',
      //       label: 'Nome',
      //     },
      //   ],
      //   fieldLabel: 'codFilial',
      //   fieldValue: 'id',
      //   format: ['codFilial', 'nomeFantasia'],
      // },
      {
        property: 'numero',
        label: 'Numero',
        maxLength: 9,
        disabled: true,
      },
      // {
      //   property: 'sequencia',
      //   label: 'Sequencia',
      //   maxLength: 2,
      //   disabled: true,
      // },
      {
        property: 'complemento',
        label: 'Complemento',
        required: false,
        optional: true,
        maxLength: 10,
      },
      // {
      //   property: 'status',
      //   label: 'Opção',
      //   required: true,
      //   options: [
      //     {
      //       label: 'F-FUTURO',
      //       value: 'FUTURO',
      //     },
      //     {
      //       label: 'D-DISPONIVEL',
      //       value: 'DISPONIVEL',
      //     },
      //   ],
      //   forceOptionsComponentType: ForceOptionComponentEnum.select,
      // },
      // {
      //   property: 'tipoMercado',
      //   label: 'Tipo Mercado',
      //   required: true,
      //   options: [
      //     {
      //       label: 'INTERNO',
      //       value: 'INTERNO',
      //     },
      //     {
      //       label: 'EXTERNO',
      //       value: 'EXTERNO',
      //     },
      //   ],
      //   forceOptionsComponentType: ForceOptionComponentEnum.select,
      // },
      {
        property: 'emissao',
        label: 'Emissao',
        required: true,
        type: 'date',
      },
      {
        property: 'contratoMinutaId',
        label: 'Minuta',
        required: true,
        searchService: '/siagro/api/contrato-minuta',
        columns: [
          {
            property: 'id',
            label: 'Codigo',
          },
          {
            property: 'descricao',
            label: 'Descricao',
          },
        ],
        fieldLabel: 'descricao',
        fieldValue: 'id',
      },
      // {
      //   property: 'modalidade',
      //   label: 'Modalidade',
      //   required: true,
      //   options: [
      //     {
      //       label: 'FIX - PRECO FIXO',
      //       value: 'FIX',
      //     },
      //     {
      //       label: 'PAF - PRECO A FIXAR',
      //       value: 'PAF',
      //     },
      //   ],
      //   forceOptionsComponentType: ForceOptionComponentEnum.select,
      // },
      // {
      //   property: 'representanteId',
      //   label: 'Representante',
      //   required: true,
      //   searchService: '/siagro/api/representantes',
      //   columns: [
      //     {
      //       property: 'nome',
      //       label: 'Nome',
      //     },
      //     {
      //       property: 'id',
      //       label: 'Codigo',
      //     },
      //   ],
      //   fieldLabel: 'nome',
      //   fieldValue: 'id',
      // },
      // {
      //   property: 'corretorId',
      //   label: 'Corretor',
      //   required: false,
      //   optional: true,
      //   searchService: '/siagro/api/corretores',
      //   columns: [
      //     {
      //       property: 'nome',
      //       label: 'Nome',
      //     },
      //     {
      //       property: 'id',
      //       label: 'Codigo',
      //     },
      //   ],
      //   fieldLabel: 'nome',
      //   fieldValue: 'id',
      // },
      {
        property: 'comissaoCorretor',
        label: 'Com.Corretor R$',
        type: 'currency',
        decimalsLength: 8,
        optional: true,
      },
      // {
      //   property: 'contribuicaoSocial',
      //   label: 'Contrib.Social',
      //   required: true,
      //   options: [
      //     {
      //       label: 'FUNRURAL',
      //       value: 'FUNRURAL',
      //     },
      //     {
      //       label: 'SENAR',
      //       value: 'SENAR',
      //     },
      //     {
      //       label: 'SEM CONTRIBUICAO',
      //       value: 'SEM_CONTRIBUICAO',
      //     },
      //   ],
      //   forceOptionsComponentType: ForceOptionComponentEnum.select,
      // },
      // {
      //   property: 'participanteId',
      //   label: 'Participante',
      //   required: true,
      //   searchService: '/siagro/api/participantes',
      //   columns: [
      //     {
      //       property: 'razaoSocial',
      //       label: 'Razao Social',
      //       width: '300px',
      //     },
      //     {
      //       property: 'id',
      //       label: 'Codigo',
      //     },
      //     {
      //       property: 'chaveIntegracao',
      //       label: 'Codigo ERP',
      //     },
      //   ],
      //   fieldLabel: 'razaoSocial',
      //   fieldValue: 'id',
      // },
      // {
      //   property: 'safraId',
      //   label: 'Safra',
      //   required: true,
      //   searchService: '/siagro/api/safras',
      //   params: {
      //     order: 'descricao',
      //   },
      //   columns: [
      //     {
      //       property: 'descricao',
      //       label: 'Descricao',
      //     },
      //     {
      //       property: 'id',
      //       label: 'Codigo',
      //     },
      //   ],
      //   fieldLabel: 'descricao',
      //   fieldValue: 'id',
      // },
      // {
      //   property: 'produtoId',
      //   label: 'Produto',
      //   required: true,
      //   searchService: '/siagro/api/produtos',
      //   params: {
      //     order: 'descricao',
      //   },
      //   columns: [
      //     {
      //       property: 'descricao',
      //       label: 'Descricao',
      //     },
      //     {
      //       property: 'id',
      //       label: 'Codigo',
      //     },
      //     {
      //       property: 'chaveIntegracao',
      //       label: 'Codigo ERP',
      //     },
      //   ],
      //   fieldLabel: 'descricao',
      //   fieldValue: 'id',
      //   format: ['descricao', 'codigo'],
      // },
      {
        property: 'quantidade',
        label: 'Quantidade',
        type: 'currency',
        decimalsLength: 3,
        required: true,
      },
      {
        property: 'unidadeMedidaCodigo',
        label: 'Und.Medida',
        required: true,
        searchService: '/siagro/api/unidade-medida',
        columns: [
          {
            property: 'codigo',
            label: 'Codigo',
          },
          {
            property: 'descricao',
            label: 'Descricao',
          },
        ],
        fieldLabel: 'codigo',
        fieldValue: 'codigo',
      },
      {
        property: 'preco',
        label: 'Preco',
        type: 'currency',
        decimalsLength: 8,
        required: true,
      },
      {
        property: 'quantidade2',
        label: 'Quant.Und.Med.2',
        type: 'currency',
        decimalsLength: 3,
        optional: true,
      },
      // {
      //   property: 'unidadeMedidaCodigo2',
      //   label: 'Und.Medida 2',
      //   optional: true,
      //   searchService: '/siagro/api/unidade-medida',
      //   columns: [
      //     {
      //       property: 'codigo',
      //       label: 'Codigo',
      //     },
      //     {
      //       property: 'descricao',
      //       label: 'Descricao',
      //     },
      //   ],
      //   fieldLabel: 'codigo',
      //   fieldValue: 'codigo',
      // },
      {
        property: 'preco2',
        label: 'Preco Und.Med.2',
        type: 'currency',
        decimalsLength: 2,
        required: true,
      },
      // {
      //   property: 'excederVolume',
      //   label: 'Exceder Volume ?',
      //   required: true,
      //   options: [
      //     {
      //       label: 'NAO PERMITE',
      //       value: 'NAO_PERMITE',
      //     },
      //     {
      //       label: 'ULT.CARGA',
      //       value: 'ULTIMA_CARGA',
      //     },
      //     {
      //       label: 'PERMITE',
      //       value: 'PERMITE',
      //     },
      //   ],
      //   forceOptionsComponentType: ForceOptionComponentEnum.select,
      // },
      // {
      //   property: 'bolsaReferenciaId',
      //   label: 'Bolsa Referencia',
      //   optional: true,
      //   searchService: '/siagro/api/bolsas',
      //   fieldLabel: 'nome',
      //   fieldValue: 'codigo',
      //   columns: [
      //     {
      //       property: 'codigo',
      //       label: 'Codigo',
      //     },
      //     {
      //       property: 'nome',
      //       label: 'Nome',
      //     },
      //   ],
      // },
      {
        property: 'dataPagamento',
        label: 'Data Pagamento',
        type: 'date',
        required: true,
      },
      {
        property: 'tipoFrete',
        label: 'Tipo Frete',
        divider: 'Frete/Logistica',
        required: true,
        options: [
          {
            label: '1-CIF',
            value: 'CIF',
          },
          {
            label: '2-FOB',
            value: 'FOB',
          },
          {
            label: '9-SEM FRETE',
            value: 'SEM_FRETE',
          },
        ],
        forceOptionsComponentType: ForceOptionComponentEnum.select,
      },
      {
        property: 'dataInicioEntrega',
        label: 'Dt.Inicio',
        required: true,
        type: 'date',
      },
      {
        property: 'dataTerminoEntrega',
        label: 'Dt.Termino',
        required: true,
        type: 'date',
      },
      // {
      //   property: 'armazemId',
      //   label: 'Local Ret/Ent',
      //   required: true,
      //   searchService: '/siagro/api/armazens',
      //   params: {
      //     order: 'descricao',
      //   },
      //   columns: [
      //     {
      //       property: 'descricao',
      //       label: 'Descricao',
      //     },
      //     {
      //       property: 'id',
      //       label: 'Codigo',
      //     },
      //     {
      //       property: 'cnpj',
      //       label: 'Cnpj',
      //     },
      //   ],
      //   fieldLabel: 'descricao',
      //   fieldValue: 'id',
      // },
      // {
      //   property: 'execucao',
      //   label: 'Execução',
      //   options: [
      //     { value: 'SANTOS', label: 'SANTOS' },
      //     { value: 'PARANAGUA', label: 'PARANAGUA' },
      //     { value: 'BOITUVA', label: 'BOITUVA' },
      //   ],
      //   forceOptionsComponentType: ForceOptionComponentEnum.select,
      // },
      {
        property: 'saldo',
        label: 'Saldo',
        required: false,
        type: 'currency',
        decimalsLength: 3,
        disabled: true,
      },
      {
        property: 'observacoes',
        label: 'Observacoes',
        divider: 'Observacoes',
        rows: 10,
        gridColumns: 6,
      },
      {
        property: 'aprovadoPor',
        label: 'Aprovado por',
        disabled: true,
        divider: 'Aprovacao/Liberacao',
      },
      {
        property: 'aprovadoEm',
        label: 'Aprovado em',
        disabled: true,
      },
      {
        property: 'liberadoPor',
        label: 'Liberado por',
        disabled: true,
      },
      {
        property: 'liberadoEm',
        label: 'Liberado em',
        disabled: true,
      },
    ],
  };
}
