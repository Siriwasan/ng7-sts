import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new UI.ChangeTitle('About'));
  }
}
