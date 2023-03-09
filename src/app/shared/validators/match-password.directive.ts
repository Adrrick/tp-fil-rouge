import {Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ValidationError} from "@nrwl/angular/src/generators/ng-add/utilities";

@Directive({
  selector: '[tpFilRougeMatchPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordDirective,
    multi: true
  }]
})
export class MatchPasswordDirective implements Validators{

  validate(control: AbstractControl): ValidationError | null {
    return this.createMatchPasswordValidator()(control);
  }

  createMatchPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const confirmedPasswordValue = control.get('confirmedPassword')?.value;
      const passwordValue = control.get('password')?.value;
      return confirmedPasswordValue !== passwordValue ? { match: true } : null;
    }
  }

}
