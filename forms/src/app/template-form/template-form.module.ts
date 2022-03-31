import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SharedModule } from '../shared/shared.module';

import { TemplateFormComponent } from './template-form.component';


@NgModule({
    declarations: [
        TemplateFormComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        AlertModule,
        HttpClientModule,
        SharedModule
    ]
})
export class TemplateFormModule { }
