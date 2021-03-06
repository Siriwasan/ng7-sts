import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';

import { FormBasedComponent } from '../../shared/components/form-based/form-based.component';
import { STS29Model } from './sts29.model';
import { STS29form } from './sts29.form';
import { formConditions } from './sts29.condition';
import { validations } from './sts29.validation';
import { STS29Service } from './sts29.service';

import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

import { RegistryInfoDialogComponent } from '../../shared/components/registry-info-dialog/registry-info-dialog.component';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-sts29',
  templateUrl: './sts29.component.html',
  styleUrls: ['./sts29.component.scss']
})
export class STS29Component extends FormBasedComponent implements OnInit {
  result: STS29Model;
  flatResult: object;
  allExpandState = false;

  formGroupA: FormGroup;
  formGroupD: FormGroup;
  formGroupE: FormGroup;

  @ViewChild('formDirectiveA') formDirectiveA: FormGroupDirective;
  @ViewChild('formDirectiveD') formDirectiveD: FormGroupDirective;
  @ViewChild('formDirectiveE') formDirectiveE: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private sts29Service: STS29Service,
    private dialogService: DialogService,
    private store: Store<fromRoot.State>
  ) {
    super(dialogService);
  }

  ngOnInit() {
    this.store.dispatch(new UI.ChangeTitle('STS 2.9'));

    this.createForm();
  }

  private createForm() {
    this.formGroupA = this.formBuilder.group(STS29form.sectionA);
    this.formGroupD = this.formBuilder.group(STS29form.sectionD);
    this.formGroupE = this.formBuilder.group(STS29form.sectionE);

    this.setSectionMembers([
      ['A', this.formGroupA, this.formDirectiveA, formConditions.sectionA],
      ['D', this.formGroupD, this.formDirectiveD, formConditions.sectionD],
      ['E', this.formGroupE, this.formDirectiveE, formConditions.sectionE]
    ]);

    this.setFormConditions(formConditions);
    this.setValidations(validations);
    this.subscribeFormConditions();
    this.initializeForm();
  }

  submit() {
    console.log('submit');
    this.submitAllSections();

    this.result = {
      description: {
        baseDb: 'STS version 2.9',
        addendum: 'BDMS modefied version 1.0'
      },
      sectionA: { ...this.formGroupA.value },
      sectionD: { ...this.formGroupD.value },
      sectionE: { ...this.formGroupE.value }
    };
    this.flatResult = { ...this.result.sectionD, ...this.result.sectionE };

    this.sts29Service.saveForm(this.result);
  }

  load() {
    console.log('load');
    this.store.dispatch(new UI.StartLoading());

    this.sts29Service.loadForm().subscribe(data => {
      console.log(data[0]);
      this.formGroupD.setValue(data[0].sectionD);
      this.formGroupE.setValue(data[0].sectionE);
      this.store.dispatch(new UI.StopLoading());
    });
  }

  clear() {
    super.clear();
  }

  clearErrors() {
    super.clearErrors();
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
