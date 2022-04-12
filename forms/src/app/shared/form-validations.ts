import { AbstractControl, FormArray, FormControl, ValidatorFn } from "@angular/forms";

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

    static cepValidator(control: FormControl){
        const cep: string = control.value;
        if (cep && cep !== ''){
            if (cep.includes('-')){
                const validaCep = /^[0-9]{5}-[0-9]{3}$/;
                return validaCep.test(cep) ? null : { cepInvalido: true };
            }
            else{
                const validaCep = /^[0-9]{8}$/;
                return validaCep.test(cep) ? null : { cepInvalido: true };
            }
        }
        return null;
    }
}