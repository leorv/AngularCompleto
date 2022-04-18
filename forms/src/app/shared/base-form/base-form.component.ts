import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-base-form',
    template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

    formulario: FormGroup = new FormGroup({});

    constructor() { }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.formulario.valid) {
            this.submit();
        }
        else {
            this.verificaValidacoesFormulario(this.formulario);
        }
    }

    abstract submit(): any;

    verificaValidacoesFormulario(formGroup: FormGroup | FormArray) {
        Object.keys(formGroup.controls).forEach(campo => {
            console.log(campo);
            const controle = formGroup.get(campo);
            // Aqui podemos marcar como dirty ou como tocado, fica a gosto do freguês.
            controle?.markAsTouched() // ou markAsDirty()
            if (controle != null && controle instanceof FormGroup || controle instanceof FormArray) {
                this.verificaValidacoesFormulario(controle);
            }
        });
    }

    resetar() {
        this.formulario.reset();
    }

    getCampo(campo: string) {
        return this.formulario.get(campo);
    }

    verificaInvalidTouched(campo: string) {
        // Uma maneira de acessar o campo
        // this.formulario.controls[campo]
        // ou com o get.

        return !this.formulario.get(campo)?.valid && (!!this.formulario.get(campo)?.touched || !!this.formulario.get(campo)?.dirty);

        // tabela verdade
        // valido true e tocado true = false e true = false => ok, nao há msg de erro.
        // valido true e tocado false = false e false = false => ok, nao há msg de erro.
        // valido false e tocado true = true e true = true => mostrar erro.
        // valido false e tocado false = true e false = false => ok, nao há msg de erro.
    }

    verificaRequired(campo: string) {
        return !!(
            this.formulario.get(campo)?.hasError('required') &&
            (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
        )
    }


    verificaEmailInvalido() {
        let campoEmail = this.formulario.get('email');

        if (campoEmail?.errors) {
            // Nós conseguimos acessar da forma abaixo porque o JavaScript
            // trata arrays e objetos como dicionários

            return campoEmail.errors['email'] && campoEmail.touched;
        }
    }

    verificaInvalid(campo: string) {
        return !this.formulario.get(campo)?.valid;
    }

    aplicaCSSErro(campo: string) {
        return {
            'is-valid': this.verificaInvalidTouched(campo),
            'is-invalid': this.verificaInvalidTouched(campo)
        }
    }



}
