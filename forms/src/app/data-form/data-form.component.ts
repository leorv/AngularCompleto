import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
    selector: 'app-data-form',
    templateUrl: './data-form.component.html',
    styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

    estados: Observable<EstadoBr[]> = new Observable();
    cargos: any[] = [];
    tecnologias: any[] = [];
    newsletterOp: any[] = [];
    frameworks: any[] = ['Angular', 'React', 'Vue', 'Sencha'];

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private dropDownService: DropdownService,
        private cepService: ConsultaCepService,
        private verificarEmailService: VerificaEmailService
    ) {
        super();
    }

    override ngOnInit(): void {
        // this.verificarEmailService.verificarEmail('email@email.com').subscribe();

        // Não vamos fazer o subscribe aqui, o pipe async automaticamente
        // faz o subscribe pra gente e quando ele for destruído ele também
        // faz o unsubscribe.
        this.estados = this.dropDownService.getEstadosBr();
        this.cargos = this.dropDownService.getCargos();
        this.tecnologias = this.dropDownService.getTecnologias();
        this.newsletterOp = this.dropDownService.getNewsletter();

        this.formulario = this.formBuilder.group({
            nome: ['leonardo', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
            confirmarEmail: [null, [FormValidations.equalsTo('email')]],
            // duplicamos o campo acima, e podemos utilizar dessa mesma estratégia
            // para validar/comparar qualquer campo que quisermos no formulário.

            endereco: this.formBuilder.group({
                cep: [null, [Validators.required, FormValidations.cepValidator]],
                complemento: [],
                rua: [null, Validators.required],
                numero: [null, Validators.required],
                bairro: [null, Validators.required],
                cidade: [null, Validators.required],
                estado: [null, Validators.required]
            }),
            cargo: [null, Validators.required],
            tecnologias: [null],
            newsletter: ['s'],
            termos: [null, Validators.pattern('true')],
            frameworks: this.buildFrameworks()
        });
        this.formulario.get('endereco.cep')?.statusChanges
            .pipe(
                distinctUntilChanged(),
                tap(value => console.log('status do CEP', value)),
                switchMap(status => status === 'VALID' ?
                    this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
                    : EMPTY)
            )
            .subscribe(dados => dados ? this.populaDadosFormulario(dados) : {});
    }

    buildFrameworks() {
        const values = this.frameworks.map(v => new FormControl(false));
        return this.formBuilder.array(values, FormValidations.requiredMinCheckBox(1));

        // return [
        //     values
        // ]
    }

    submit() {
        // aqui vamos fazer uma correção no valor a ser enviado para o servidor
        // para o nome do framework sair corretamente, e não somente true ou false.
        let valueSubmit = Object.assign({}, this.formulario.value);
        valueSubmit = Object.assign(valueSubmit, {
            frameworks: valueSubmit.frameworks
                .map((v: any, i: any) => v ? this.frameworks[i] : null)
                .filter((v: any) => v !== null)
        });
        // Fim da correção.
        this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
            .pipe(map(res => res))
            .subscribe(dados => {
                this.resetar();
            });
    }

    consultaCEP() {
        let cep = this.formulario.get('endereco.cep')?.value;
        this.resetaDadosFormulario();

        if (cep != null && cep !== '') {
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

    setarCargo() {
        const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
        this.formulario.get('cargo')?.setValue(cargo);
    }

    compararCargos(obj1: any, obj2: any) {
        return (obj1 && obj2) ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
    }

    setarTecnologias() {
        this.formulario.get('tecnologias')?.setValue(['java', 'ruby']);
    }

    validarEmail(formControl: FormControl) {
        return this.verificarEmailService.verificarEmail(formControl.value)
            .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
    }
}
