import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';

import { FormBasedComponent } from '../../shared/components/form-based/form-based.component';
import { DialogService } from '../../shared/services/dialog.service';

import { TAVR21form } from './tavr21.form';
import { formConditions } from './tavr21.condition';
import { validations } from './tavr21.validation';
import { TAVR21Model } from './tavr21.model';
import { TAVR21Service } from './tavr21.service';

import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

@Component({
  selector: 'app-tavr21',
  templateUrl: './tavr21.component.html',
  styleUrls: ['./tavr21.component.scss']
})
export class TAVR21Component extends FormBasedComponent implements OnInit {
  result: TAVR21Model;

  formGroupC: FormGroup;

  @ViewChild('formDirectiveC') formDirectiveC: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private store: Store<fromRoot.State>,
    private tavr21Service: TAVR21Service
  ) {
    super(dialogService);
  }

  ngOnInit() {
    this.store.dispatch(new UI.ChangeTitle('TAVR 2.1'));

    this.setAvailableSection('C');
    this.setFormConditions(formConditions);
    this.setValidations(validations);

    this.createForm();
    this.subscribeFormConditions();
    this.initializeForm();
  }

  private createForm() {
    this.formGroupC = this.formBuilder.group(TAVR21form.sectionC);

    this.setSectionMembers([['C', this.formGroupC, formConditions.sectionC, this.formDirectiveC]]);
  }

  submit() {
    console.log('submit');
    this.submitAllSections();

    this.result = {
      description: {
        baseDb: 'TAVR version 2.1',
        addendum: 'BDMS modefied version 1.0'
      },
      sectionC: { ...this.formGroupC.value }
    };

    this.tavr21Service.saveForm(this.result);
  }

  load() {
    console.log('load');
    this.store.dispatch(new UI.StartLoading());

    // this.formGroupC.setValue(this.result.sectionC);
    // this.store.dispatch(new UI.StopLoading());

    this.tavr21Service.loadForm().subscribe(data => {
      console.log(data[0]);
      this.formGroupC.setValue(data[0].sectionC);
      this.store.dispatch(new UI.StopLoading());
    });
  }

  clear() {
    super.clear();
  }

  clearErrors() {
    super.clearErrors();
  }
}
