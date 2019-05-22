import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new UI.ChangeTitle('Home'));
  }
}
