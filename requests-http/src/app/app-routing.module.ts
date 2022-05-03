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
        path: 'rxjs-poc', loadChildren: () => import('../app/unsubscribe-rxjs/unsubscribe-rxjs.module').then(mod => mod.UnsubscribeRxjsModule)
    },
    {
        path: 'upload',
        loadChildren: () => import('./upload-file/upload-file.module').then(mod => mod.UploadFileModule)
    },
    {
        path: '', pathMatch: 'full', redirectTo: 'upload'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
