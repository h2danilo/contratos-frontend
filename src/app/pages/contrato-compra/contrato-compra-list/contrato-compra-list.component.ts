import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  PoBreadcrumb,
  PoModalAction,
  PoModalComponent,
} from '@po-ui/ng-components';
import {
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableFilters,
} from '@po-ui/ng-templates';

import { ContratoCompraListService } from './contrato-compra-list.service';

@Component({
  selector: 'app-contrato-compra-list',
  templateUrl: './contrato-compra-list.component.html',
  styleUrls: [],
})
export class ContratoCompraListComponent implements OnInit {
  public serviceApi = '/siagro/api/contrato-compra';

  public columns?: PoPageDynamicTableFilters[];
  public title?: string;
  public actions?: PoPageDynamicTableActions;
  public keepFilters?: boolean;
  public autoRouter?: boolean;
  public breadcrumb?: PoBreadcrumb;
  public tableCustomActions?: Array<PoPageDynamicTableCustomTableAction>;

  constructor(private service: ContratoCompraListService) {}

  onClickUserDetail() {}

  onClickDependents() {}

  ngOnInit(): void {
    const {
      title,
      actions,
      fields,
      autoRouter,
      keepFilters,
      breadcrumb,
      tableCustomActions,
    } = this.service.getMetadata();

    this.title = title;
    this.actions = actions;
    this.columns = fields;
    this.autoRouter = autoRouter;
    this.keepFilters = keepFilters;
    this.breadcrumb = breadcrumb;
    this.tableCustomActions = tableCustomActions;
  }
}
