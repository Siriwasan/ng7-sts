import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { RegistryInfoDialogComponent } from 'src/app/shared/components/registry-info-dialog/registry-info-dialog.component';

@Component({
  selector: 'app-sts29',
  templateUrl: './sts29.component.html',
  styleUrls: ['./sts29.component.scss']
})
export class STS29Component implements OnInit {
  formGroup: FormGroup;
  result: object;

  @ViewChild('formDirective') private formDirective: FormGroupDirective;

  validationMessages = {
    HeightCM: [
      { type: 'required', message: 'Height is required' },
      { type: 'min', message: 'Height must be at least 20 cm' },
      { type: 'max', message: 'Height cannot be more than 251 cm' }
    ],
    WeightKg: [
      { type: 'required', message: 'Weight is required' },
      { type: 'min', message: 'Weight must be at least 10 kg' },
      { type: 'max', message: 'Weight cannot be more than 250 kg' }
    ],
    Temp: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' }
    ]
  };

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      HeightCM: [null, [Validators.required, Validators.min(20), Validators.max(251)]],
      WeightKg: [null, [Validators.required, Validators.min(10), Validators.max(250)]],
      FHCAD: [null, Validators.required],
      Diabetes: [null, Validators.required],
      Dyslip: [null, Validators.required],
      Dialysis: [null, Validators.required],
      Hypertn: [null, Validators.required],
      TobaccoUse: [null, Validators.required]
    });
  }

  submit() {
    console.log(this.formGroup);
    this.result = { ...this.formGroup.value };
  }

  clear() {
    this.formDirective.resetForm();
    // this.formGroup.reset();
  }

  load() {
    this.formGroup.setValue(this.result);
  }

  isInvalid(control: string, validationType: string) {
    return this.formGroup.get(control).hasError(validationType);
    // &&       (this.formGroup.get(control).dirty || this.formGroup.get(control).touched)
  }

  clickInfo() {
    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(RegistryInfoDialogComponent, dialogConfig);
  }
}
