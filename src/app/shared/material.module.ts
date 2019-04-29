import { NgModule } from '@angular/core';
import { MatSidenavModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatSidenavModule],
  exports: [MatButtonModule, MatSidenavModule]
})
export class MaterialModule {}
