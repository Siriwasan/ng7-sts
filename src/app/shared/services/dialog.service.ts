import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export interface DialogData {
  title: string;
  content: string;
  buttons: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  createConfirmDialog(dialogData: DialogData) {
    return this.dialog.open(ConfirmDialogComponent, {
      disableClose: false,
      autoFocus: true,
      data: {
        title: dialogData.title,
        content: dialogData.content,
        buttons: dialogData.buttons
      }
    });
  }
}
