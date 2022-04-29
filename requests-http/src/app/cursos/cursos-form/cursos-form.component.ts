import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-cursos-form',
    templateUrl: './cursos-form.component.html',
    styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

    form: FormGroup = new FormGroup({});
    submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(128)]]
        })
    }

    hasError(campo: string){
        return this.form.get(campo)?.errors;
    }

    onSubmit(){
        this.submitted = true;
        console.log(this.form.value);
        if (this.form.valid){
            console.log('submit');
        }
    }

    onCancel(){
        this.submitted = false;
        this.form.reset();
        console.log('onCancel');
    }

}
