import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoDialogModule, PoModalModule, PoModule } from '@po-ui/ng-components';

@NgModule({
  imports: [CommonModule, FormsModule, PoDialogModule, PoModule, PoModalModule],
  exports: [CommonModule, FormsModule, PoDialogModule, PoModule, PoModalModule],
})
export class SharedModule {}
