import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CursosService } from '../cursos/cursos.service';

@Component({
    selector: 'app-curso-detalhe',
    templateUrl: './curso-detalhe.component.html',
    styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit, OnDestroy {

    inscricao: Subscription = new Subscription();

    id: number = 0;
    curso: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cursosService: CursosService) {
        // console.log(this.route); <- apenas para descobrir como ele se apresenta como objeto e seus parâmetros.
        // this.id = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.inscricao = this.route.params.subscribe(
            (params: any) => {
                this.id = params['id'];

                this.curso = this.cursosService.getCurso(this.id);

                if (this.curso == null) {
                    this.router.navigate(['/naoEncontrado']);
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }

}
