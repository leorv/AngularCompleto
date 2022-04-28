import { switchMap } from 'rxjs/operators';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { catchError, Observable, EMPTY, Subject } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';

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

    bsModalRef?: BsModalRef;

    constructor(
        private cursoService: CursosService,
        private modalService: BsModalService
    ) { }

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
                    // this.error$.next(true);
                    this.handleError();
                    return EMPTY;
                    // return of(); // isso aqui daria o mesmo resultado dali de cima.
                })
            );
    }

    handleError(){
        this.bsModalRef = this.modalService.show(AlertModalComponent);
        this.bsModalRef.content.type = 'danger';
        this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
    }

}
