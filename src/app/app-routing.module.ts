import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './feature/welcome/welcome.component';
import { HomeComponent } from './feature/home/home.component';
import { AboutComponent } from './feature/about/about.component';
import { STS29Component } from './feature/sts29/sts29.component';
import { TAVR21Component } from './feature/tavr21/tavr21.component';
import { DeactivateGuard } from './shared/guards/deactivate.guard';
import { RegistryListComponent } from './feature/registry-list/registry-list.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'registry', component: RegistryListComponent },
  { path: 'sts29', component: STS29Component, canDeactivate: [DeactivateGuard] },
  { path: 'tavr21', component: TAVR21Component, canDeactivate: [DeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
