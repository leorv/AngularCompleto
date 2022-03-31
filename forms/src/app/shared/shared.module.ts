import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { AlertModule } from 'ngx-bootstrap/alert';



@NgModule({
  declarations: [
      FormDebugComponent,
      CampoControlErroComponent
  ],
  imports: [
    CommonModule,
    AlertModule
  ],
  exports:[
    FormDebugComponent,
    CampoControlErroComponent
  ]
})
export class SharedModule { }
