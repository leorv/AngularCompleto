import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';

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
        private location: Location
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(128)]]
        })
    }

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
