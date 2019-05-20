import { CanDeactivate } from '@angular/router';

import { FormBasedComponent } from '../components/form-based/form-based.component';

export class DeactivateGuard implements CanDeactivate<FormBasedComponent> {
  canDeactivate(component: FormBasedComponent) {
    return component.canDeactivate();
  }
}
