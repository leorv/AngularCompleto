import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'cursos',
        loadChildren: () => import('./cursos/cursos.module').then(mod => mod.CursosModule)
        // antes do Angular 5, colocávamos o caminho com app/, depois na v6
        // usamos somente o ./
        //'./cursos/cursos.module#CursosModule'
        // mas agora não recebe mais string, e sim loadChildrenCallback
    },
    {
        // TODO:inserir o componente corretamente no lazy loading.
        path: 'rxjs-poc', loadChildren: () => import('../app/unsubscribe-rxjs/unsubscribe-rxjs.module').then(mod => mod.UnsubscribeRxjsModule)
    },
    {
        path: '', pathMatch: 'full', redirectTo: 'cursos'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
