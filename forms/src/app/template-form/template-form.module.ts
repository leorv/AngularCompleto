import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateFormComponent } from './template-form.component';
import { FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
    declarations: [
        TemplateFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AlertModule
    ]
})
export class TemplateFormModule { }
