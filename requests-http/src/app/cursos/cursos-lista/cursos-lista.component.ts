import { switchMap, take } from 'rxjs/operators';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { catchError, Observable, EMPTY, Subject } from 'rxjs';
import { Curso } from '../curso';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosCrudService } from '../cursos-crud.service';

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

    cursoSelecionado: number = 0;

    // deleteModal
    modalRef?: BsModalRef;
    message?: string;

    @ViewChild('deleteModal') deleteModal: any;

    constructor(
        private cursoService: CursosCrudService,
        private alertModalService: AlertModalService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: BsModalService,

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

    handleError() {
        this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    }

    onEdit(id: number) {
        this.router.navigate(['editar', id], { relativeTo: this.route })
    }

    onDelete(id: number) {
        // this.cursoSelecionado = id;
        // this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
        const result$ = this.alertModalService.showConfirmModal('Confirmação', 'Quer realmente remover este curso?');
        result$.asObservable()
            .pipe(
                take(1),
                switchMap(result => result ? this.cursoService.delete(id) : EMPTY)
            )
            .subscribe({
                next: success => {
                    this.onRefresh();
                    this.modalRef?.hide();
                },
                error: error => {
                    this.alertModalService.showAlertDanger('Erro ao remover o curso.');
                    this.modalRef?.hide();
                }
            })
    }

    onConfirmDelete() {
        this.cursoService.delete(this.cursoSelecionado).subscribe({
            next: success => {
                this.onRefresh();
                // this.modalRef?.hide(); Não precisa mais. É um método do showConfirm.
            },
            error: error => {
                this.alertModalService.showAlertDanger('Erro ao remover o curso.');
                // this.modalRef?.hide();
            }
        })
    }

    onDeclineDelete() {
        this.modalRef?.hide();
    }

}
