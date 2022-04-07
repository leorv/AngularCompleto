import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
    selector: 'app-data-form',
    templateUrl: './data-form.component.html',
    styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

    formulario: FormGroup = new FormGroup({});
    estados: EstadoBr[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private dropDownService: DropdownService,
        private cepService: ConsultaCepService
    ) { }

    ngOnInit(): void {
        this.dropDownService.getEstadosBr()
            .subscribe((dados: any) => {
                this.estados = dados;
                console.log('dados dos estados: ');
                console.log(dados, this.estados);
            });

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
        if (this.formulario.valid) {
            this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
                .pipe(map(res => res))
                .subscribe(dados => {
                    console.log(dados);
                    // this.formulario.reset();
                    this.resetar();
                }
                );
        } else {
            console.log('formulário inválido.');

            // No ES6 foi introduzido o keys, que consegue extrair cada chave que temos no objeto.
            // vai extrair o nome, email e endereço:
            this.verificaValidacoesFormulario(this.formulario);

        }

    }

    verificaValidacoesFormulario(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(campo => {
            console.log(campo);
            const controle = formGroup.get(campo);
            // Aqui podemos marcar como dirty ou como tocado, fica a gosto do freguês.
            controle?.markAsTouched()
            if (controle instanceof FormGroup) {
                this.verificaValidacoesFormulario(controle);
            }
        });
    }

    resetar() {
        this.formulario.reset();
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
        let cep = this.formulario.get('endereco.cep')?.value;
        this.resetaDadosFormulario();

        if (cep != null && cep !== ''){
            this.cepService.consultaCEP(cep)
                ?.subscribe(dados => {
                    console.log(dados);
                    this.populaDadosFormulario(dados);
                });
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
