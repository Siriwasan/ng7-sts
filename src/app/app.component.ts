import { Component, OnDestroy } from '@angular/core';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'ng7-sts';

  navOpened = true;
  navOver = 'side';
  watcher: Subscription;

  constructor(media: MediaObserver) {
    this.watcher = media.asObservable().subscribe((change: MediaChange[]) => {
      if (
        change[0].mqAlias === 'md' ||
        change[0].mqAlias === 'lg' ||
        change[0].mqAlias === 'xl'
      ) {
        this.navOpened = true;
        this.navOver = 'side';
      } else {
        this.navOpened = false;
        this.navOver = 'over';
      }
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
}
