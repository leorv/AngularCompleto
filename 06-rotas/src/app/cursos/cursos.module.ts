import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

// Services
import { CursosService } from './cursos.service';
import { CursosRoutingModule } from './cursos-routing.module';

@NgModule({
    declarations: [
        CursosComponent,
        CursoDetalheComponent,
        CursoNaoEncontradoComponent
    ],
    imports: [
        CommonModule,

        CursosRoutingModule,

        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule
    ],
    exports: [],
    providers: [
        CursosService
    ],
})
export class CursosModule { }