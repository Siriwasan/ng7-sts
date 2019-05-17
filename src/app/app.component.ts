import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng7-sts';
  isLoading$: Observable<boolean>;

  navOpened = true;
  navOver = 'side';
  watcher: Subscription;

  constructor(media: MediaObserver, private store: Store<fromRoot.State>) {
    this.watcher = media.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias === 'md' || change[0].mqAlias === 'lg' || change[0].mqAlias === 'xl') {
        this.navOpened = true;
        this.navOver = 'side';
      } else {
        this.navOpened = false;
        this.navOver = 'over';
      }
    });
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
}
