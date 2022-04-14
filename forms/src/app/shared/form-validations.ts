import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

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

    static equalsTo(otherField: string){
        const validator: ValidatorFn = (formControl: AbstractControl) => {
            if (formControl instanceof FormControl) {
                if (otherField == null){
                    throw new Error('É necessário informar um campo.');
                }

                if (!formControl.root || !(<FormGroup>formControl.root).controls){
                    return null;
                }

                const field = (<FormGroup>formControl.root).get(otherField);

                if (!field){
                    throw new Error('É necessário informar um campo válido.');
                }

                if (field.value !== formControl.value){
                    return { equalsTo: otherField };
                }

                return null;
            }
            throw new Error('formArray não é uma instância de FormArray');
        };
        return validator;
    }
}