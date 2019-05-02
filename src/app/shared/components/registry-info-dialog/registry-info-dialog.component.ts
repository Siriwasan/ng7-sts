import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-registry-info-dialog',
  templateUrl: './registry-info-dialog.component.html',
  styleUrls: ['./registry-info-dialog.component.scss']
})
export class RegistryInfoDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<RegistryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
