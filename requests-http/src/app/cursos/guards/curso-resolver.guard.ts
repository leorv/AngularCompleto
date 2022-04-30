import { Curso } from './../curso';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CursosService } from '../cursos.service';

@Injectable({
    providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {
    constructor(
        private service: CursosService
    ){    
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Curso> {
        if (route.params && route.params['id']){
            return this.service.getByid(route.params['id']);
        }
        return of({
            id: 0,
            nome: ''
        });
    }


}
