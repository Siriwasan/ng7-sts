import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './modules/welcome/welcome.component';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { STS29Component } from './modules/sts29/sts29.component';
import { TAVR21Component } from './modules/tavr21/tavr21.component';
import { DeactivateGuard } from './shared/guards/deactivate.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'sts29', component: STS29Component, canDeactivate: [DeactivateGuard] },
  { path: 'tavr21', component: TAVR21Component, canDeactivate: [DeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
