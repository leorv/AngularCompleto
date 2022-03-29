import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';

import { TemplateFormComponent } from './template-form.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';



@NgModule({
    declarations: [
        TemplateFormComponent,
        FormDebugComponent,
        CampoControlErroComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AlertModule,
        HttpClientModule
    ]
})
export class TemplateFormModule { }
