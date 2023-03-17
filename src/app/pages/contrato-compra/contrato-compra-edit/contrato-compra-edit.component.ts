import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoBreadcrumb,
  PoDialogService,
  PoDynamicFormComponent,
  PoDynamicFormField,
  PoNotificationService,
  PoPageAction,
} from '@po-ui/ng-components';
import { EMPTY, take, tap } from 'rxjs';
import { ContratoCompraEditService } from './contrato-compra-edit.service';

const SERVICE_API = '/siagro/api/contrato-compra';

const ACTION_INSERT = 'insert';
const ACTION_UPDATE = 'update';

const headers = new HttpHeaders({
  'X-PO-SCREEN-LOCK': 'TRUE',
});

@Component({
  selector: 'app-contrato-compra-edit',
  templateUrl: './contrato-compra-edit.component.html',
  styleUrls: [],
})
export class ContratoCompraEditComponent implements OnInit, AfterViewInit {
  @ViewChild(PoDynamicFormComponent, { static: true })
  dynamicForm!: PoDynamicFormComponent;

  public title?: string;
  public fields?: PoDynamicFormField[] = [];
  public breadcrumb?: PoBreadcrumb;

  public actions: PoPageAction[] = [
    {
      label: 'Salvar',
      action: () => this.save(),
    },
    {
      label: 'Salvar e novo',
      action: () => this.save(true),
    },
    {
      label: 'Cancelar',
      action: () => this.cancel(),
    },
  ];

  formAction = ACTION_UPDATE;

  model: any = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private service: ContratoCompraEditService
  ) {}

  ngAfterViewInit(): void {
    this.service
      .getInitValues()
      .subscribe((initialValues) => (this.model = initialValues));
  }

  ngOnInit(): void {
    this.service.getMetadata().subscribe((metadata) => {
      this.title = metadata.title;
      this.fields = metadata.fields;
      this.breadcrumb = metadata.breadcrumb;
    });

    const { id } = this.route.snapshot.params;

    this.loadDataFromAPI(id).subscribe();
  }

  loadDataFromAPI(id?: string) {
    if (!id) {
      this.formAction = ACTION_INSERT;
      return EMPTY;
    }

    return this.http.get<any>(SERVICE_API + `/${id}`).pipe(
      take(1),
      tap((data: any) => {
        const { componentes, ...rest } = data;
        this.model = rest;
      })
    );
  }

  save(saveNew?: boolean) {
    if (this.dynamicForm.form.invalid) {
      this.poNotification.warning(
        'Formulário precisa ser preenchido corretamente.'
      );
      return;
    }
    const { id } = this.route.snapshot.params;

    const data = {
      ...this.model,
    };

    const message = this.isActionUpdate
      ? 'Recurso atualizado com sucesso.'
      : 'Recurso criado com sucesso.';

    const save$ = this.isActionUpdate
      ? this.updateAction(id, data)
      : this.insertAction(data);

    save$.subscribe(() => {
      this.poNotification.success(message);

      if (saveNew) {
        this.router.navigateByUrl('/contrato-compra/new');
        return;
      }

      this.router.navigateByUrl('/contrato-compra');
    });
  }

  get isActionUpdate() {
    return this.formAction === ACTION_UPDATE;
  }

  insertAction(data: any) {
    return this.http.post<any>(SERVICE_API, data, { headers }).pipe(take(1));
  }

  updateAction(id: string, data: any) {
    return this.http
      .put<any>(SERVICE_API + `/${id}`, data, { headers })
      .pipe(take(1));
  }

  cancel() {
    if (this.dynamicForm.form.dirty) {
      this.poDialog.confirm({
        title: 'Cancelar',
        message: 'Tem certeza que deseja cancelar esta operação?',
        confirm: () => this.router.navigateByUrl('/contrato-compra'),
      });

      return;
    }

    this.router.navigateByUrl('/contrato-compra');
  }
}
