import { HostListener, isDevMode } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormGroupDirective } from '@angular/forms';
import { map, first } from 'rxjs/operators';

import { DialogService } from '../../services/dialog.service';
import { FormCondition } from '../../../modules/sts29/sts29.condition';

export interface AbstractFormBased {
  createForm(): void;
}

export class FormBasedComponent {
  protected sections: string;
  protected sectionDetails: any[];
  protected validations: any;

  constructor(private basedDialogService: DialogService) {}

  setSections(sec: string) {
    this.sections = sec;
  }

  protected createFormConditions() {
    this.sections.split('').forEach(section => {
      const sectionDetail = this.sectionDetails.find(o => o[0] === section);
      this.subscribeValueChanges(sectionDetail[1], sectionDetail[2]);
    });
  }

  protected getFormGroup(section: string): FormGroup {
    const sectionDetail = this.sectionDetails.find(o => o[0] === section);
    if (sectionDetail === undefined) {
      return null;
    }
    return sectionDetail[1];
  }

  protected getFormConditions(section: string): FormCondition[] {
    const sectionDetail = this.sectionDetails.find(o => o[0] === section);
    if (sectionDetail === undefined) {
      return null;
    }
    return sectionDetail[2];
  }

  protected getFormDirective(section: string): FormGroupDirective {
    const sectionDetail = this.sectionDetails.find(o => o[0] === section);
    if (sectionDetail === undefined) {
      return null;
    }
    return sectionDetail[3];
  }

  protected subscribeValueChanges(form: FormGroup, condisions: FormCondition[]) {
    condisions.forEach(condition => {
      form.get(condition.parentControl).valueChanges.subscribe(newValue => {
        if (condition.conditionValues.findIndex(o => o === newValue) < 0) {
          form.get(condition.control).setValidators(null);
          form.get(condition.control).reset();
          // this.formGroup.get(condition.control).disable();
        } else {
          form.get(condition.control).setValidators(Validators.required);
          // this.formGroup.get(condition.control).enable();
        }
      });
    });
  }

  protected isShowControl(section: string, controlName: string): boolean {
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

  protected setValidations(vals: object) {
    this.validations = vals;
  }

  protected getValidations(control: string): object {
    // const vals = Object.entries(this.validations).find(([key, value]) => key === control);
    // if (vals === undefined) {
    //   return null;
    // }
    // return vals[1];

    let vals: object;

    Object.entries(this.validations).find(([key, value]) => {
      const result = Object.entries(value).find(([key2, value2]) => key2 === control);
      if (result === undefined) {
        return false;
      }
      vals = result;
      return true;
    });

    if (vals === undefined) {
      return null;
    }
    return vals[1];
  }

  protected isInvalid(control: string, validationType: string) {
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

  protected formErrors(formSection: string): string {
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

  canDeactivate() {
    // ? Prototype for leaving form after changed
    // ? return confirm('Do you really want to leave?');
    // ? return this.form.submitted || !this.form.dirty;

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
