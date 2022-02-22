import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { CriarCursoComponent } from './criar-curso.component';

import { CursosService } from '../cursos/cursos.service';

@NgModule({
  declarations: [
    CriarCursoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
      CriarCursoComponent
  ],
  providers: [
      CursosService
  ]
})
export class CriarCursoModule { }
