import { HostListener, isDevMode } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormGroupDirective } from '@angular/forms';
import { map, first } from 'rxjs/operators';

import { DialogService } from '../../services/dialog.service';

export interface FormCondition {
  control: string;
  parentControl: string;
  conditionValues: any[];
}

export interface ValidationMessage {
  type: string;
  message: string;
}

export class FormBasedComponent {
  private availableSection: string;
  private formConditions: any;
  private validations: any;
  private sectionMembers: any[];

  constructor(private basedDialogService: DialogService) {}

  protected setAvailableSection(availableSection: string) {
    this.availableSection = availableSection;
  }

  protected setFormConditions(formConditions: { [section: string]: FormCondition[] }) {
    this.formConditions = formConditions;
  }

  protected setValidations(validations: {
    [section: string]: { [control: string]: ValidationMessage[] };
  }) {
    this.validations = validations;
  }

  protected setSectionMembers(sectionMembers: any[]) {
    this.sectionMembers = sectionMembers;
  }

  protected subscribeFormConditions() {
    this.availableSection.split('').forEach(section => {
      const sectionMember = this.sectionMembers.find(o => o[0] === section);
      this.subscribeValueChanges(sectionMember[1], sectionMember[2]); // FormGroup - FormCondition[]
    });
  }

  private subscribeValueChanges(formGroup: FormGroup, condisions: FormCondition[]) {
    condisions.forEach(condition => {
      formGroup.get(condition.parentControl).valueChanges.subscribe(value => {
        const control = formGroup.get(condition.control);

        if (condition.conditionValues.findIndex(o => o === value) < 0) {
          control.setValidators(null);
          control.reset();
          // control.disable();
        } else {
          control.setValidators(Validators.required);
          // control.enable();
        }
      });
    });
  }

  // initialize form to remove validator in child control
  protected initializeForm() {
    this.availableSection.split('').forEach(section => {
      const formGroup = this.getFormGroup(section);
      formGroup.setValue(formGroup.value);
    });
  }

  private getFormGroup(section: string): FormGroup {
    const sectionMember = this.sectionMembers.find(o => o[0] === section);
    if (sectionMember === undefined) {
      return null;
    }
    return sectionMember[1]; // FormGroup
  }

  private getFormConditions(section: string): FormCondition[] {
    const sectionMember = this.sectionMembers.find(o => o[0] === section);
    if (sectionMember === undefined) {
      return null;
    }
    return sectionMember[2]; // FormCondition[]
  }

  private getFormDirective(section: string): FormGroupDirective {
    const sectionMember = this.sectionMembers.find(o => o[0] === section);
    if (sectionMember === undefined) {
      return null;
    }
    return sectionMember[3]; // FormGroupDirective
  }

  // public isShowControl(section: string, controlName: string): boolean {
  //   const form = this.getFormGroup(section);
  //   const condisions = this.getFormConditions(section);

  //   const formCondition = condisions.find(condition => condition.control === controlName);

  //   if (formCondition === undefined) {
  //     return true;
  //   }

  //   const parentValue = form.get(formCondition.parentControl).value;
  //   if (formCondition.conditionValues.findIndex(o => o === parentValue) < 0) {
  //     return false;
  //   }

  //   return true;
  // }

  public isShowControl(control: string): boolean {
    let condition: FormCondition;
    let section: string;

    Object.entries(this.formConditions).find(([key, value]) => {
      const result = (value as FormCondition[]).find(o => o.control === control);
      if (result === undefined) {
        return false;
      }
      condition = result;
      section = key[key.length - 1];
      return true;
    });

    if (condition === undefined) {
      return true;
    }

    const formGroup = this.getFormGroup(section);
    const parentValue = formGroup.get(condition.parentControl).value;
    if (condition.conditionValues.findIndex(o => o === parentValue) < 0) {
      return false;
    }

    return true;
  }

  public getValidations(control: string): ValidationMessage[] {
    let vals: ValidationMessage[];

    Object.entries(this.validations).find(([key, value]) => {
      const result = Object.entries(value).find(([key2, value2]) => key2 === control);
      if (result === undefined) {
        return false;
      }
      vals = result[1];
      return true;
    });
    return vals;
  }

  public isInvalid(control: string, validationType: string) {
    let section: string;

    // find control's section
    Object.entries(this.validations).find(([key, value]) => {
      const result = Object.entries(value).find(([key2, value2]) => key2 === control);
      if (result === undefined) {
        return false;
      }
      section = key[key.length - 1];
      return true;
    });

    return this.getFormGroup(section)
      .get(control)
      .hasError(validationType);
    // &&       (this.formGroup.get(control).dirty || this.formGroup.get(control).touched)
  }

  public getFormErrors(section: string): string {
    let error = 0;
    let total = 0;

    const formGroup = this.getFormGroup(section);

    Object.keys(formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // console.log(
          //   'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
          //   controlErrors[keyError]
          // );
        });
        error++;
      }
      if (this.isShowControl(key)) {
        total++;
      }
    });

    return `${total - error}/${total}`;
  }

  protected isFormDirty(): boolean {
    let isDirty = false;

    this.availableSection.split('').forEach(section => {
      isDirty = isDirty || this.getFormGroup(section).dirty;
    });
    return isDirty;
  }

  protected submitAllSections() {
    this.availableSection.split('').forEach(section => {
      this.getFormDirective(section).onSubmit(undefined);
    });
  }

  protected clear() {
    this.availableSection.split('').forEach(section => {
      this.getFormDirective(section).resetForm();
    });
  }

  protected clearErrors() {
    this.availableSection.split('').forEach(section => {
      this.getFormDirective(section).resetForm(this.getFormGroup(section).value);
    });
  }

  public canDeactivate() {
    // ? Prototype for leaving form after changed
    // ? return confirm('Do you really want to leave?');
    // ? return this.form.submitted || !this.form.dirty;

    if (!this.isFormDirty()) {
      return true;
    }

    const dialogRef = this.basedDialogService.createConfirmDialog({
      title: 'Warning!!!',
      content: 'Save before leave',
      buttons: ['Cancel', 'Discard']
    });

    return dialogRef.afterClosed().pipe(
      map(result => {
        if (result === 'Cancel') {
          return false;
        }
        if (result === 'Discard') {
          return true;
        }
      }),
      first()
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    if (!isDevMode()) {
      console.log('Processing beforeunload...');
      event.returnValue = false;
    }
  }
}
