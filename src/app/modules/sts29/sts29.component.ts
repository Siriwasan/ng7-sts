import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
  ValidationErrors
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { RegistryInfoDialogComponent } from 'src/app/shared/components/registry-info-dialog/registry-info-dialog.component';

interface STS29Model {
  sectionD: object;
  sectionE: object;
}

interface FormCondition {
  control: string;
  parentControl: string;
  conditionValues: any[];
}

@Component({
  selector: 'app-sts29',
  templateUrl: './sts29.component.html',
  styleUrls: ['./sts29.component.scss']
})
export class STS29Component implements OnInit {
  result: STS29Model;
  flatResult: object;
  allExpandState = false;

  formGroupD: FormGroup;
  formGroupE: FormGroup;

  @ViewChild('formDirectiveD') formDirectiveD: FormGroupDirective;
  @ViewChild('formDirectiveE') formDirectiveE: FormGroupDirective;

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

  formConditions = {
    sectionD: [
      { control: 'DiabCtrl', parentControl: 'Diabetes', conditionValues: ['1'] },
      { control: 'InfEndTy', parentControl: 'InfEndo', conditionValues: ['1'] },
      { control: 'InfEndCult', parentControl: 'InfEndo', conditionValues: ['1'] }
    ],
    sectionE: [
      { control: 'PrCAB', parentControl: 'PrCVInt', conditionValues: ['1'] },
      { control: 'PrValve', parentControl: 'PrCVInt', conditionValues: ['1'] }
    ]
  };

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.createForm();
    this.createFormConditions();
  }

  createForm() {
    this.formGroupD = this.formBuilder.group({
      HeightCM: [null, [Validators.required, Validators.min(20), Validators.max(251)]],
      WeightKg: [null, [Validators.required, Validators.min(10), Validators.max(250)]],
      FHCAD: [null, Validators.required],
      Diabetes: [null, Validators.required],
      DiabCtrl: [null],
      Dyslip: [null, Validators.required],
      Dialysis: [null, Validators.required],
      Hypertn: [null, Validators.required],
      InfEndo: [null, Validators.required],
      InfEndTy: [null],
      InfEndCult: [null],
      TobaccoUse: [null, Validators.required]
    });

    this.formGroupE = this.formBuilder.group({
      PrCVInt: [null, Validators.required],
      PrCAB: [null],
      PrValve: [null]
    });
  }

  private createFormConditions() {
    this.subscribeValueChanges(this.formGroupD, this.formConditions.sectionD);
    this.subscribeValueChanges(this.formGroupE, this.formConditions.sectionE);
  }

  private subscribeValueChanges(form: FormGroup, formConditions: FormCondition[]) {
    formConditions.forEach(condition => {
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
        return this.formConditions.sectionD;

      case 'E':
        return this.formConditions.sectionE;

      default:
        return null;
    }
  }

  isShowControl(section: string, controlName: string): boolean {
    const form = this.getFormGroup(section);
    const formConditions = this.getFormConditions(section);

    const formCondition = formConditions.find(condition => condition.control === controlName);

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
      sectionD: { ...this.formGroupD.value },
      sectionE: { ...this.formGroupE.value }
    };
    this.flatResult = { ...this.result.sectionD, ...this.result.sectionE };
  }

  loadAll() {
    console.log('load all');
    this.formGroupD.setValue(this.result.sectionD);
    this.formGroupE.setValue(this.result.sectionE);
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
