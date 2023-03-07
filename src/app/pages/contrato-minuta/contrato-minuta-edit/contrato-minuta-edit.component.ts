import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoBreadcrumb,
  PoDialogService,
  PoDynamicFormComponent,
  PoNotification,
  PoNotificationService,
  PoPageAction,
  PoRichTextComponent,
} from '@po-ui/ng-components';
import {
  PoPageDynamicEditActions,
  PoPageDynamicEditField,
} from '@po-ui/ng-templates';
import { delay, EMPTY, forkJoin, take, tap } from 'rxjs';
import { ContratoMinutaEditService } from './contrato-minuta-edit.service';

const ACTION_INSERT = 'insert';
const ACTION_UPDATE = 'update';

const headers = new HttpHeaders({
  'X-PO-SCREEN-LOCK': 'TRUE',
});

const HEROES = [
  { id: 'num_contrato', name: 'Nº Contrato' },
  { id: '2', name: 'Batman' },
  { id: '5', name: 'BatGirl' },
  { id: '3', name: 'Robin' },
  { id: '4', name: 'Flash' },
];

@Component({
  selector: 'app-contrato-minuta-edit',
  templateUrl: './contrato-minuta-edit.component.html',
  styleUrls: ['./contrato-minuta-edit.component.css'],
})
export class ContratoMinutaEditComponent implements OnInit, AfterViewInit {
  @ViewChild(PoDynamicFormComponent, { static: true })
  dynamicForm!: PoDynamicFormComponent;

  @ViewChild(PoRichTextComponent, { static: true })
  richText!: PoRichTextComponent;

  public serviceApi: string = '/siagro/api/contrato-minuta';

  //public richText?: string;

  //public actions?: PoPageDynamicEditActions;
  public title?: string;
  public autoRouter?: boolean;
  public fields?: PoPageDynamicEditField[];
  public breadcrumb?: PoBreadcrumb;
  public loadParamMinutaEmitter = new EventEmitter<boolean>(false);

  labelRichText: string = 'Minuta do Contrato';
  model: any = {};
  componentes: any = [];
  opacityValue: number = 1;
  overValue: boolean = false;
  heroes = HEROES;
  paramsMinuta: [] = [];

  formAction = ACTION_UPDATE;

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

  constructor(
    private service: ContratoMinutaEditService,
    private router: Router,
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private http: HttpClient //private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.getMetadata().subscribe((metadata) => {
      this.title = metadata.title;
      this.fields = metadata.fields;
      this.breadcrumb = metadata.breadcrumb;
    });

    const { id } = this.route.snapshot.params;

    //this.loadDataFromAPI(id).subscribe();
    this.loadDataFromAPI(id).subscribe((responses) => {
      const { ...rest } = responses[0];
      this.model = rest;

      this.paramsMinuta = responses[1];
      console.log('Dados Carregados da API');
      this.loadParamMinutaEmitter.emit(true);
    });

    //this.cdr.detectChanges();
  }

  //@HostListener('dragstart', ['$event'])
  /*handleDragStart(e: any) {
    this.opacityValue = 0.1;

    console.log('handleDragStart', e.target.dataset.value);
    e.dataTransfer.effectAllowed = 'copy';
    //e.dataTransfer.setData('text', '${' + e.target.dataset.value + '}');

    if (e.dataTransfer) {
      e.dataTransfer.setData('text', 'id');
    } else if (e.originalEvent.dataTransfer) {
      e.originalEvent.dataTransfer.setData('text', 'id');
    }

    //e.dataTransfer.setData('text', 'teste');
    console.log(e.dataTransfer.getData('text'));
    //this.cdr.detectChanges();
  }*/

  /*@HostListener('dragend', ['$event'])
  handleDragEnd(e: any) {
    this.opacityValue = 1;
    console.log('handleDragEnd');
    document.querySelectorAll('.container .box').forEach(function (item) {
      item.classList.remove('over');
    });
  }*/

  // @HostListener('window:dragenter', ['$event'])
  // handleDragEnter(e: any) {
  //   this.overValue = true;
  // }

  // @HostListener('dragleave', ['$event'])
  // handleDragLeave(e: any) {
  //   this.overValue = false;
  // }

  // @HostListener('drop', ['$event'])
  // handleDrop(e: any) {
  //   console.log('prev', e.preventDefault());
  //   e.stopPropagation(); // stops the browser from redirecting.

  //   return false;
  // }

  viewInit() {
    const handleDragStart = (e: any) => {
      this.opacityValue = 0.1;

      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text', '${' + e.target.dataset.value + '}');
    };

    const handleDragEnd = (e: any) => {
      this.opacityValue = 1;
      //console.log('handleDragEnd');
      document.querySelectorAll('.container .box').forEach(function (item) {
        item.classList.remove('over');
      });
    };

    const handleDragOver = (e: any) => {
      if (e.preventDefault) {
        e.preventDefault();
      }

      return false;
    };

    const handleDragEnter = (e: any) => {
      this.overValue = true;
    };

    const handleDragLeave = (e: any) => {
      this.overValue = false;
    };

    const handleDrop = (e: any) => {
      e.stopPropagation(); // stops the browser from redirecting.

      return false;
    };

    setTimeout(function () {
      let items = document.querySelectorAll('.container .box');

      items.forEach(function (item) {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        //item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
      });
    }, 0);
  }

  ngAfterViewInit(): void {
    this.loadParamMinutaEmitter.subscribe((loading) => {
      if (loading) {
        this.viewInit();
      }
    });
  }

  get isActionUpdate() {
    return this.formAction === ACTION_UPDATE;
  }

  changeEvent() {
    //Evento ao sair do richtext
    //this.poNotification.warning(this.model.minuta);
  }

  changeEventModel() {
    //console.log(document.getElementsByClassName('po-rich-text-body').);
  }

  /*titleaction(event: object) {
    //this.poNotification.warning(JSON.stringify(event));
    this.richText.focus();
  }*/

  loadDataFromAPI(id?: string) {
    if (!id) {
      this.formAction = ACTION_INSERT;
      return EMPTY;
    }

    const request1 = this.http
      .get<any>(this.serviceApi + `/${id}`)
      .pipe(take(1));
    const request2 = this.http
      .get<any>(this.serviceApi + `/minuta-params`)
      .pipe(take(1));

    return forkJoin([request1, request2]);
  }

  loadDataFromAPI_Old(id?: string) {
    if (!id) {
      this.formAction = ACTION_INSERT;
      return EMPTY;
    }

    return this.http.get<any>(this.serviceApi + `/${id}`).pipe(
      take(1),
      tap((data: any) => {
        const { componentes, ...rest } = data;
        this.model = rest;
        //this.richText = minuta;
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
        this.router.navigateByUrl('/contrato-minuta/new');
        return;
      }

      this.router.navigateByUrl('/contrato-minuta');
    });
  }

  insertAction(data: any) {
    return this.http
      .post<any>(this.serviceApi, data, { headers })
      .pipe(take(1));
  }

  updateAction(id: string, data: any) {
    return this.http
      .put<any>(this.serviceApi + `/${id}`, data, { headers })
      .pipe(take(1));
  }

  cancel() {
    if (this.dynamicForm.form.dirty) {
      this.poDialog.confirm({
        title: 'Cancelar',
        message: 'Tem certeza que deseja cancelar esta operação?',
        confirm: () => this.router.navigateByUrl('/contrato-minuta'),
      });

      return;
    }

    this.router.navigateByUrl('/contrato-minuta');
  }
}
