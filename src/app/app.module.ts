import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { STS29Component } from './modules/sts29/sts29.component';
import { environment } from '../environments/environment';
import { reducers } from './app.reducer';
import { TAVR21Component } from './modules/tavr21/tavr21.component';
import { RegistryListComponent } from './modules/registry-list/registry-list.component';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, HomeComponent, AboutComponent, STS29Component, TAVR21Component, RegistryListComponent],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
