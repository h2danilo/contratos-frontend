import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import {
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableFilters,
} from '@po-ui/ng-templates';
import { ContratoMinutaListService } from './contrato-minuta-list.service';

@Component({
  selector: 'app-contrato-minuta-list',
  templateUrl: './contrato-minuta-list.component.html',
})
export class ContratoMinutaListComponent implements OnInit {
  public serviceApi: string = '/siagro/api/contrato-minuta';

  public columns?: PoPageDynamicTableFilters[];
  public title?: string;
  public actions?: PoPageDynamicTableActions;
  public keepFilters?: boolean;
  public autoRouter?: boolean;
  public breadcrumb?: PoBreadcrumb;

  constructor(private service: ContratoMinutaListService) {}

  ngOnInit(): void {
    const { title, actions, fields, autoRouter, keepFilters, breadcrumb } =
      this.service.getMetadata();

    this.title = title;
    this.actions = actions;
    this.columns = fields;
    this.autoRouter = autoRouter;
    this.keepFilters = keepFilters;
    this.breadcrumb = breadcrumb;
  }
}
