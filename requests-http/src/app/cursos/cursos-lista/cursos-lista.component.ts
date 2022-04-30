import { switchMap } from 'rxjs/operators';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { catchError, Observable, EMPTY, Subject } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';

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

    constructor(
        private cursoService: CursosService,
        private alertModalService: AlertModalService,
        private router:Router,
        private route: ActivatedRoute
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
        this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    }

    onEdit(id: number){
        this.router.navigate(['editar', id], { relativeTo: this.route })
    }

}
