import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatDialogModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
