import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

    constructor() { }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        // console.log(form);
        // console.log(this.usuario);
        console.log(form.value);
    }

}
