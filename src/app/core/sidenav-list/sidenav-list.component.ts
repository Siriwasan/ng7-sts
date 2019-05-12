import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Input() navMode: string;
  @Output() closeSidenav = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onClose() {
    if (this.navMode === 'over') {
      this.closeSidenav.emit();
    }
  }
}
