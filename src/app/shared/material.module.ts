import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule],
  exports: [MatButtonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule]
})
export class MaterialModule {}
