import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';

// Angular Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

// Services
import { AlunosService } from './alunos.service';
import { AlunosRoutingModule } from './alunos.routing.module';
import { AlunosDeactivateGuard } from '../guards/alunos.deactivate.guard';

@NgModule({
    declarations: [
        AlunosComponent,
        AlunoDetalheComponent,
        AlunoFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

        AlunosRoutingModule,

        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule
    ],
    exports: [],
    providers: [
        AlunosService,
        AlunosDeactivateGuard
    ],
})
export class AlunosModule { }