import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { asBlob } from 'html-docx-js-typescript';
// @ts-ignore
import { saveAs } from 'file-saver';

// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import {
  PoDialogService,
  PoDynamicFormComponent,
  PoModalAction,
  PoModalComponent,
  PoNotification,
  PoNotificationService,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take } from 'rxjs';

const headers = new HttpHeaders({
  'x-po-screen-lock': 'true',
});

@Component({
  selector: 'app-contrato-compra-modal',
  templateUrl: './contrato-compra-modal.component.html',
  styleUrls: [],
})
export class ContratoCompraModalComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @ViewChild('form', { static: true }) form!: NgForm;
  @ViewChild(PoDynamicFormComponent, { static: true })
  dynamicForm!: PoDynamicFormComponent;

  componenteTableColumns: PoTableColumn[] = [
    {
      property: 'email',
      label: 'Email',
      type: 'cellTemplate',
    },
    {
      property: 'name',
      label: 'Name',
      type: 'cellTemplate',
    },
  ];

  componentes: any = [];
  tableActions: PoTableAction[] = [
    {
      label: 'Excluir',
      icon: 'po-icon po-icon-delete',
      action: this.removeComponenteItem.bind(this),
    },
  ];

  model: any = {};
  items: any[] = [];

  fields: Array<any> = [];

  public serviceApi = '/siagro/api/contrato-compra';

  //armazemColumns = armazemLookupColumns;

  primaryAction: PoModalAction = { label: 'Salvar', action: () => {} };

  secondaryAction: PoModalAction = {
    label: 'Cancelar',
    action: this.close.bind(this),
  };

  constructor(
    private http: HttpClient,
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {}

  open(primaryAction: PoModalAction, model: any, items: any[]): void {
    this.configDialog(primaryAction, model, items);

    this.poModal.open();
  }

  close() {
    this.poModal.close();
  }

  configDialog(primaryAction: PoModalAction, model: any, items: any[]): void {
    this.primaryAction = {
      label: primaryAction.label,
      action: () => {
        if (primaryAction) {
          primaryAction.action();
        }
      },
    };

    this.model = model;
    this.items = items;
    this.componentes = [
      { email: 'h2danilovalim@gmail.com', name: 'danilo' },
      { email: 'h2danilovalim@gmail.com', name: 'danilo2' },
    ];

    //console.log('componentes1:' + JSON.stringify(this.componentes));
  }

  async sendContract() {
    const body = {
      contrato: this.model.minutaContrato,
    };
    const response = this.http
      .post(this.serviceApi + `/sendContract/${this.model.id}`, body, {
        headers,
      })
      .pipe(take(1));

    response.subscribe((data: any) => {
      try {
        console.log('sendContract:', JSON.stringify(data));

        this.poNotification.success(
          'Contrato Enviado com sucesso - Id DocuSign:' + data.message
        );

        this.close();
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  async sendContractV1() {
    /*var converted = await asBlob(this.model.minutaContrato, {
      orientation: 'landscape',
      margins: { top: 720 },
    });
    saveAs(converted, 'test.docx');*/
    pdfMake
      .createPdf(
        `<p style='text-align: justify;'>Lorem Ipsum is simply d-ummy text of th-e printing and typese-tting industry. Lorem Ipsum has b-een the industry's standard dummy text ever since the 1500s</p>`
      )
      .download('test111111.pdf');
  }

  removeComponenteItem(data: any): void {
    const { id } = data;
    this.poDialog.confirm({
      title: 'Confirma exclusao ?',
      message: 'Deseja realmente excluir este item ?',
      confirm: () => this.removeComponenteItemAction(id),
    });
  }

  removeComponenteItemAction(id: any): void {
    const newArray = [...this.componentes];
    const i = newArray.findIndex((x) => x.id == id);
    if (i > -1) {
      newArray.splice(i, 1);
      this.componentes = [...newArray];
    }
  }

  addNewComponenteItem() {
    console.log('componentes:' + JSON.stringify(this.componentes));
    const newItem = {};
    //this.componentes = [...this.componentes, newItem];
    this.componentes = [
      { email: 'h2danilovalim@gmail.com', name: 'danilo' },
      { email: 'h2danilovalim@gmail.com', name: 'danilo2' },
      { email: 'h2danilovalim@gmail.com', name: 'danilo4' },
    ];
  }
}
