import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';

const cursosRoutes: Routes = [
    { path: 'cursos', component: CursosComponent },
    { path: 'curso/:id', component: CursoDetalheComponent },
    { path: 'naoEncontrado', component: CursoNaoEncontradoComponent }
]

@NgModule({
    declarations: [],

    imports: [
        RouterModule.forChild(cursosRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CursosRoutingModule { }
