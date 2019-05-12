import { CanDeactivate } from '@angular/router';
import { STS29Component } from 'src/app/modules/sts29/sts29.component';

export class DeactivateGuard implements CanDeactivate<STS29Component> {
  canDeactivate(component: STS29Component) {
    return component.canDeactivate();
  }
}
