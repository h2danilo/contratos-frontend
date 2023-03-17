import { Component, OnDestroy, OnInit } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  showMenu = false;

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) },
    {
      label: 'Minutas de Contrato',
      action: this.onClick.bind(this),
      link: '/contrato-minuta',
    },
    {
      label: 'Contratos de Compra',
      action: this.onClick.bind(this),
      link: '/contrato-compra',
    },
  ];

  private onClick() {
    //alert('Clicked in menu item');
  }
}
