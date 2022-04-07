import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

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
        private http: HttpClient,
        private cepService: ConsultaCepService
    ) { }

    ngOnInit(): void {
    }

    onSubmit(form: any) {
        console.log('formulário: ', form);
        // console.log(this.usuario);
        // console.log(form.value);

        // para teste eu usei: https://resttesttest.com/
        this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
            .pipe(map(res => res))
            .subscribe(dados => {
                console.log(dados);
                // Aqui no template driven, temos que fazer referência ao form do template,
                // acessando o atributo form dele e aí sim temos o reset().
                form.form.reset();
            });
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

        if (cep!=null && cep != '') {
            this.resetaDadosFormulario(form);
            this.cepService.consultaCEP(cep)
                ?.subscribe(dados => {
                    console.log(dados);
                    this.populaDadosForm(dados, form);
                });            
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
