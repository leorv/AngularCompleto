import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // Implementando o lazy load para carregar os módulos somente se necessário.
    // NÃO PODE TER EM MAIS NENHUM LUGAR DA APLICAÇÃO IMPORTANDO ESTE MÓDULO, SOMENTE AQUI.
    { path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(mod => mod.CursosModule)},
    // No Angular 2, seria { path: 'cursos', loadChildren: 'app/cursos/cursos.module#CursosModule'},
    { path: 'alunos', loadChildren: () => import('./alunos/alunos.module').then(mod => mod.AlunosModule)},
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }