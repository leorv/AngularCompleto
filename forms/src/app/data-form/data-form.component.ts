import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-data-form',
    templateUrl: './data-form.component.html',
    styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

    formulario: FormGroup = new FormGroup({});

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        /*
        Esta é uma forma verbosa de instanciar o formulário com seus campos.
        Há uma segunda forma, com o formBuilder.

        this.formulario = new FormGroup({
            nome: new FormControl(null),
            email: new FormControl(null),
        })*/

        this.formulario = this.formBuilder.group({
            nome: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],

            endereco: this.formBuilder.group({
                cep: [null, Validators.required],
                complemento: [],
                rua: [null, Validators.required],
                numero: [null, Validators.required],
                bairro: [null, Validators.required],
                cidade: [null, Validators.required],
                estado: [null, Validators.required]
            })

            // Outra forma de agrupar os campos:
            // endereco: new FormGroup({
            //     cep: new FormControl(null),
            //     complemento: new FormControl(null),
            //     rua: new FormControl(null),
            //     numero: new FormControl(null),
            //     bairro: new FormControl(null),
            //     cidade: new FormControl(null),
            //     estado: new FormControl(null)
            // })            
        });
    }

    onSubmit() {
        console.log(this.formulario);
        this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
            .pipe(map(res => res))
            .subscribe(dados => {
                console.log(dados);
                // this.formulario.reset();
                this.resetar();
            }
                // DEPRECATED:
                //
                //,
                // (error: any) => {
                //     alert('erro.');
                // }
            );
    }

    resetar() {
        this.formulario.reset();
    }

    verificaInvalidTouched(campo: string) {
        // Uma maneira de acessar o campo
        // this.formulario.controls[campo]
        // ou com o get.

        return !this.formulario.get(campo)?.valid && !!this.formulario.get(campo)?.touched;

        // tabela verdade
        // valido true e tocado true = false e true = false => ok, nao há msg de erro.
        // valido true e tocado false = false e false = false => ok, nao há msg de erro.
        // valido false e tocado true = true e true = true => mostrar erro.
        // valido false e tocado false = true e false = false => ok, nao há msg de erro.
    }

    aplicaCSSErro(campo: string) {
        return {
            'is-valid': this.verificaInvalidTouched(campo),
            'is-invalid': this.verificaInvalidTouched(campo)
        }
    }

    verificaEmailInvalido() {
        let campoEmail = this.formulario.get('email');

        if (campoEmail?.errors) {
            // Nós conseguimos acessar da forma abaixo porque o JavaScript
            // trata arrays e objetos como dicionários

            return campoEmail.errors['email'] && campoEmail.touched;
        }
    }

    consultaCEP() {
        console.log(this.formulario.get('endereco.cep'));

        let cep = this.formulario.get('endereco.cep')?.value;

        cep = cep.replace(/\D/g, '');


        if (cep != "") {
            var validaCEP = /^[0-9]{8}$/;

            this.resetaDadosFormulario();

            if (validaCEP.test(cep)) {
                // this.http.get("//viacep.com.br/ws/" + cep + "/json"); <-- sem ECMA5
                // Abaixo a concatenação com ECMAScript 5
                this.http.get(`//viacep.com.br/ws/${cep}/json`)
                    .pipe(map((dados: any) => dados))
                    .subscribe(dados => {
                        console.log(dados);
                        this.populaDadosFormulario(dados)
                    });
            }
        }
    }

    resetaDadosFormulario() {
        // A diferença entre o setValue e o patchValue é que no patch nós fazemos apenas
        // uma correção.
        // E se formos passar o setValue, precisaremos setar todos os campos do formulário.
        this.formulario.patchValue({
            endereco: {
                rua: null,
                complemento: null,
                bairro: null,
                cidade: null,
                estado: null
            }
        })
    }

    populaDadosFormulario(dados: any) {
        this.formulario.patchValue({
            endereco: {
                rua: dados.logradouro,
                complemento: dados.complemento,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf
            }
        });
        // Apenas a título de exemplo, pode-se também
        // mudar apenas um campo:
        // this.formulario.get('nome')?.setValue('Loiane');
    }
}
