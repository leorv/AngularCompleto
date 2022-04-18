import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FormValidations } from '../form-validations';

@Component({
    selector: 'app-error-msg',
    templateUrl: './error-msg.component.html',
    styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

    @Input() control: FormControl | AbstractControl | null = new FormControl();
    @Input() label: string = '';

    constructor() { }

    ngOnInit(): void {
    }

    get errorMessage() {
        if (this.control != null) {
            if (this.control instanceof FormControl) {
                for (let propertyName in this.control.errors) {
                    if (this.control.errors.hasOwnProperty(propertyName)
                        && this.control.touched || this.control.dirty) {
                        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
                    }
                }
            }
            if (this.control instanceof FormArray) {
                for (let propertyName in this.control.errors) {
                    if (this.control.errors.hasOwnProperty(propertyName)
                        && this.control.touched || this.control.dirty) {
                        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
                    }
                }
            }
        }
        return null;
    }

}
