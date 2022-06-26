import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors} from "@angular/forms";

@Directive({
    selector: '[customValidator]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}
    ]
  })

export class CustomValidatorDirective {
   static includehttp(control: AbstractControl): ValidationErrors|null{
                if (control.value==='test'){
                 console.log('test coming done')
                return { includehttp: true}}
                else{
                    return (null);
                }
    }
}