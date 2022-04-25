import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, EMPTY, Subject } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
    selector: 'app-cursos-lista',
    templateUrl: './cursos-lista.component.html',
    styleUrls: ['./cursos-lista.component.scss'],
    preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

    // Uma prática adotada pela comunidade é a notação finlandesa,
    // colocando um dólar no final da variável, significa que
    // ela é um observable.
    cursos$: Observable<Curso[]> = new Observable();

    error$ = new Subject<boolean>();

    constructor(private cursoService: CursosService) { }

    ngOnInit(): void {
        // this.cursoService.list().subscribe(
        //     dados => this.cursos = dados
        // );
        this.onRefresh();
    }

    onRefresh() {
        this.cursos$ = this.cursoService.list()
            .pipe(
                // map(),
                // tap(), a lógica do erro é legal deixarmos por último, para ele pegar qualquer erro que ocorre aqui antes.
                // switchMap()
                catchError(error => {
                    console.error(error);
                    this.error$.next(true);
                    return EMPTY;
                    // return of(); // isso aqui daria o mesmo resultado dali de cima.
                })
            );
    }

}
