import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { STS29Component } from './modules/sts29/sts29.component';
import { RegistryInfoDialogComponent } from './shared/components/registry-info-dialog/registry-info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    AboutComponent,
    STS29Component,
    RegistryInfoDialogComponent
  ],
  imports: [CoreModule, SharedModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RegistryInfoDialogComponent]
})
export class AppModule {}
