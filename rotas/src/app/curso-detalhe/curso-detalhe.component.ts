import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-curso-detalhe',
    templateUrl: './curso-detalhe.component.html',
    styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit, OnDestroy {

    inscricao: Subscription = new Subscription();

    id: string = '';

    constructor( private route: ActivatedRoute) {
        // console.log(this.route); <- apenas para descobrir como ele se apresenta como objeto e seus parâmetros.
        // this.id = this.route.snapshot.params['id'];
     }

    ngOnInit(): void {
        this.inscricao = this.route.params.subscribe(
            (params: any) => {
                this.id = params['id'];
            }
        );
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }

}
