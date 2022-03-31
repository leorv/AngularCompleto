import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
            nome: [null],
            email: [null]
        });
    }

    onSubmit(){
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

    resetar(){
        this.formulario.reset();
    }
}
