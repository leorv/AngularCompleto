import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { CursosComponent } from './cursos.component';

import { CursosService } from '../cursos/cursos.service';

@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
      CursosComponent
  ],
   providers: [
       CursosService
   ]
})
export class CursosModule { }
