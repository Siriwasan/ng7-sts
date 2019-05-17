import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title$: Observable<string>;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.title$ = this.store.select(fromRoot.getTitle);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
