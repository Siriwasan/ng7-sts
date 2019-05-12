import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
  ValidationErrors
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { RegistryInfoDialogComponent } from '../../shared/components/registry-info-dialog/registry-info-dialog.component';
import { STS29Model, STS29form } from './sts29.model';
import { FormCondition, formConditions } from './sts29.condition';
import { validationMessages } from './sts29.validation';
import { STS29Service } from './sts29.service';

@Component({
  selector: 'app-sts29',
  templateUrl: './sts29.component.html',
  styleUrls: ['./sts29.component.scss']
})
export class STS29Component implements OnInit {
  result: STS29Model;
  flatResult: object;
  allExpandState = false;

  get validationMessages() {
    return validationMessages;
  }

  formGroupD: FormGroup;
  formGroupE: FormGroup;

  @ViewChild('formDirectiveD') formDirectiveD: FormGroupDirective;
  @ViewChild('formDirectiveE') formDirectiveE: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private sts29Service: STS29Service
  ) {}

  ngOnInit() {
    this.createForm();
    this.createFormConditions();
  }

  createForm() {
    this.formGroupD = this.formBuilder.group(STS29form.sectionD);
    this.formGroupE = this.formBuilder.group(STS29form.sectionE);
  }

  private createFormConditions() {
    this.subscribeValueChanges(this.formGroupD, formConditions.sectionD);
    this.subscribeValueChanges(this.formGroupE, formConditions.sectionE);
  }

  private subscribeValueChanges(form: FormGroup, condisions: FormCondition[]) {
    condisions.forEach(condition => {
      form.get(condition.parentControl).valueChanges.subscribe(newValue => {
        if (condition.conditionValues.findIndex(o => o === newValue) < 0) {
          form.get(condition.control).setValidators(null);
          form.get(condition.control).reset();
          // this.formGroup.get(condition.control).disable();
          console.log('clear validator');
        } else {
          form.get(condition.control).setValidators(Validators.required);
          // this.formGroup.get(condition.control).enable();
          console.log('set validator');
        }
      });
    });
  }

  getFormGroup(section: string): FormGroup {
    switch (section) {
      case 'D':
        return this.formGroupD;

      case 'E':
        return this.formGroupE;

      default:
        return null;
    }
  }

  getFormConditions(section: string): FormCondition[] {
    switch (section) {
      case 'D':
        return formConditions.sectionD;

      case 'E':
        return formConditions.sectionE;

      default:
        return null;
    }
  }

  isShowControl(section: string, controlName: string): boolean {
    const form = this.getFormGroup(section);
    const condisions = this.getFormConditions(section);

    const formCondition = condisions.find(condition => condition.control === controlName);

    if (formCondition === undefined) {
      return true;
    }

    const parentValue = form.get(formCondition.parentControl).value;
    if (formCondition.conditionValues.findIndex(o => o === parentValue) < 0) {
      return false;
    }

    return true;
  }

  submitAll() {
    console.log('submit all');
    this.formDirectiveD.onSubmit(undefined);
    this.formDirectiveE.onSubmit(undefined);
    this.result = {
      description: {
        baseDb: 'STS version 2.9',
        addendum: 'BDMS modefied version 1.0'
      },
      sectionD: { ...this.formGroupD.value },
      sectionE: { ...this.formGroupE.value }
    };
    this.flatResult = { ...this.result.sectionD, ...this.result.sectionE };

    this.sts29Service.saveForm(this.result);
  }

  loadAll() {
    console.log('load all');
    // this.formGroupD.setValue(this.result.sectionD);
    // this.formGroupE.setValue(this.result.sectionE);
    this.sts29Service.loadForm().subscribe(data => {
      console.log(data[0]);
      this.formGroupD.setValue(data[0].sectionD);
      this.formGroupE.setValue(data[0].sectionE);
    });
  }

  clearAll() {
    this.formDirectiveD.resetForm();
    this.formDirectiveE.resetForm();
  }

  clearErrors() {
    this.formDirectiveD.resetForm(this.formGroupD.value);
    this.formDirectiveE.resetForm(this.formGroupE.value);
  }

  isInvalid(control: string, validationType: string) {
    return this.formGroupD.get(control).hasError(validationType);
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

  formErrors(formSection: string): string {
    let error = 0;
    let total = 0;

    const form = this.getFormGroup(formSection);

    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // console.log(
          //   'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
          //   controlErrors[keyError]
          // );
        });
        error++;
      }
      if (this.isShowControl(formSection, key)) {
        total++;
      }
    });

    return `${total - error}/${total}`;
  }
}
