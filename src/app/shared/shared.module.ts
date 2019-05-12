import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../shared/material.module';
import { RegistryInfoDialogComponent } from './components/registry-info-dialog/registry-info-dialog.component';
import { DeactivateGuard } from './guards/deactivate.guard';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [RegistryInfoDialogComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [DeactivateGuard],
  entryComponents: [RegistryInfoDialogComponent, ConfirmDialogComponent]
})
export class SharedModule {}
