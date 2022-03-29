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

    consultaCEP(cep: any){
        console.log(cep);

        cep = cep.replace(/\D/g, '');

        if (cep != ""){
            var validaCEP = /^[0-9]{8}$/;

            if (validaCEP.test(cep)){
                // this.http.get("//viacep.com.br/ws/" + cep + "/json"); <-- sem ECMA5
                // Abaixo a concatenação com ECMAScript 5
                this.http.get(`//viacep.com.br/ws/${cep}/json`)
                    .pipe(map((dados: any) => dados))
                    .subscribe(dados => console.log(dados));
            }
        }
    }
}
