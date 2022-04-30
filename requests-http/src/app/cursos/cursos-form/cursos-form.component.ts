import { switchMap } from 'rxjs/operators';
import { Curso } from './../curso';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';
import { map } from 'rxjs';

@Component({
    selector: 'app-cursos-form',
    templateUrl: './cursos-form.component.html',
    styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

    form: FormGroup = new FormGroup({});
    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private cursosService: CursosService,
        private modal: AlertModalService,
        private location: Location,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        // Abaixo temos dois subscribers aninhados, funciona, mas não é uma boa prática.
        // this.route.params.subscribe(
        //     (params: any) => {
        //         // Poderíamos acessar também como se fosse um array. const id = params['id'];
        //         const id: number = params.id;
        //         const curso$ = this.cursosService.getByid(id);
        //         curso$.subscribe(
        //             {
        //                 next: (curso: Curso) => {
        //                     this.updateForm(curso);
        //                 }
        //             }
        //         )
        //     })

        // this.route.params
        //     .pipe(
        //         map((params: any) => {
        //             const id: number = params['id'];
        //             return id;
        //         }),
        //         switchMap((id: number) => this.cursosService.getByid(id))
        //         // poderia também colocar mais um switchMap para por exemplo pegar as aulas do curso.
        //         // switchMap(curso => obterAulas), nessa lógica.
        //     )
        //     .subscribe((curso: Curso) => this.updateForm(curso));
        // concatMap -> ordem da requisição importa
        // mergeMap -> ordem não importa
        // exhaustMap -> casos de login

        // DETALHE IMPORTANTE:
        // Quando fazemos o subscribe no route.params, é o próprio Angular que vai
        // gerenciar essa inscrição. :)
        // Não precisa de unsubscribe, take, takeuntil, etc.

        const curso: Curso = this.route.snapshot.data['curso'];

        this.form = this.formBuilder.group({
            id: [curso.id],
            nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(128)]]
        })
    }


    // updateForm(curso: Curso) {
    //     this.form.patchValue({
    //         id: curso.id,
    //         nome: curso.nome
    //     })
    // }

    hasError(campo: string) {
        return this.form.get(campo)?.errors;
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.form.value);
        if (this.form.valid) {
            console.log('submit');
            this.cursosService.create(this.form.value).subscribe({
                next: success => {
                    console.log('sucesso', success);
                    this.modal.showAlertSuccess('Curso criado com sucesso.');
                    this.location.back(); // Mesma coisa que clicar no botão de voltar do browser.
                },
                error: error => {
                    console.log('Erro:', error);
                    this.modal.showAlertDanger('Erro ao criar curso');
                },
                complete: () => console.log('Request completado.')
            });
        }
    }

    onCancel() {
        this.submitted = false;
        this.form.reset();
        console.log('onCancel');
    }

}
