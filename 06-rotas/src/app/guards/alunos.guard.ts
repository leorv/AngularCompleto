import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


@Injectable()
export class AlunosGuard implements CanActivateChild {
    canActivateChild(
        childRoute: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean> | Promise<boolean> {
            // É importante usar o debug pra gente poder ver os objetos e já pensar em uma lógica
            // para trabalhar as permissões, por exemplo.
            console.log(childRoute);
            console.log(state);

            if (state.url.includes('edit')){
                // alert('Usuário sem acesso.');
                // return false;
            }

            return true;
    }
}