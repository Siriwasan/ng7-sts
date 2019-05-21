import { FormGroup, FormGroupDirective } from '@angular/forms';

export interface FormCondition {
  [section: string]: ControlCondition[];
}

export interface ControlCondition {
  control: string;
  parentControl: string;
  conditionValues: any[];
}

export interface FormValidation {
  [section: string]: {
    [control: string]: ValidationMessage[];
  };
}

export interface ValidationMessage {
  type: string;
  message: string;
}

export type SectionMember = [string, FormGroup, ControlCondition[], FormGroupDirective];
