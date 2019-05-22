import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { STS29Component } from './sts29/sts29.component';
import { TAVR21Component } from './tavr21/tavr21.component';
import { RegistryListComponent } from './registry-list/registry-list.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    HomeComponent,
    AboutComponent,
    STS29Component,
    TAVR21Component,
    RegistryListComponent
  ],
  imports: [SharedModule],
  exports: [
    WelcomeComponent,
    HomeComponent,
    AboutComponent,
    STS29Component,
    TAVR21Component,
    RegistryListComponent
  ]
})
export class FeatureModule {}
