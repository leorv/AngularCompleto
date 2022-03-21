import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: 'cursos',
        loadChildren: () => import('./cursos/cursos.module').then(mod => mod.CursosModule),
        canActivate: [AuthGuard]
    },
    { path: 'alunos', 
        loadChildren: () => import('./alunos/alunos.module').then(mod => mod.AlunosModule),
        canActivate: [AuthGuard]},
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }