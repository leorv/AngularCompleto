import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-template-form',
    templateUrl: './template-form.component.html',
    styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

    usuario: any = {
        nome: 'Leonardo',
        email: 'leonardo@email.com'
    }

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        console.log(form);
        // console.log(this.usuario);
        // console.log(form.value);
    }

    verificaInvalidTouched(campo: any) {
        return !campo.valid && campo.touched;
    }

    aplicaCSSErro(campo: any) {
        return {
            'is-valid': campo.valid && campo.touched,
            'is-invalid': !campo.valid && campo.touched
        }
    }

    consultaCEP(cep: any, form: any) {
        console.log(cep);

        cep = cep.replace(/\D/g, '');


        if (cep != "") {
            var validaCEP = /^[0-9]{8}$/;

            this.resetaDadosFormulario(form);

            if (validaCEP.test(cep)) {
                // this.http.get("//viacep.com.br/ws/" + cep + "/json"); <-- sem ECMA5
                // Abaixo a concatenação com ECMAScript 5
                this.http.get(`//viacep.com.br/ws/${cep}/json`)
                    .pipe(map((dados: any) => dados))
                    .subscribe(dados => {
                        console.log(dados);
                        this.populaDadosForm(dados, form)
                    });
            }
        }
    }

    populaDadosForm(dados: any, formulario: any) {
        console.log(formulario);
        // formulario.setValue({
        //     nome: formulario.value.nome,
        //     email: formulario.value.email,
        //     endereco: {
        //         cep: dados.cep,
        //         complemento: dados.complemento,
        //         rua: dados.logradouro,
        //         numero: formulario.value.endereco.numero,
        //         bairro: dados.bairro,
        //         cidade: dados.localidade,
        //         estado: dados.uf
        //     }
        // });

        formulario.form.patchValue({
            endereco: {
                cep: dados.cep,
                complemento: dados.complemento,
                rua: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf
            }
        })
    }

    resetaDadosFormulario(formulario: any){
        formulario.form.patchValue({
            endereco: {
                complemento: null,
                rua: null,
                bairro: null,
                cidade: null,
                estado: null
            }
        })
    }
}
