import { AbstractControl, FormArray, ValidatorFn } from "@angular/forms";

export class FormValidations {
    static requiredMinCheckBox(min: number = 1) {
        const validator: ValidatorFn = (formArray: AbstractControl) => {
            /*     const values = formArray.controls;
                let totalChecked = 0;
                for (let i = 0; i <= values.length; i++){
                    if (values[i].value){
                        totalChecked += 1;
                    }
                } */
            // abaixo temos o mesmo que alí em cima, só que de uma forma funcional.
            if (formArray instanceof FormArray) {
                const totalChecked = formArray.controls
                    .map(v => v.value)
                    .reduce((prev, next) => next ? prev + next : prev, 0);
                return totalChecked >= min ? null : { required: true };
            }
            throw new Error('formArray não é uma instância de FormArray');
        };
        return validator;
    }
}