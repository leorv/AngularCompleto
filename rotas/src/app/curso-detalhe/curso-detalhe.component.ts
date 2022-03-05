import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-curso-detalhe',
    templateUrl: './curso-detalhe.component.html',
    styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

    id: string = '';

    constructor( private route: ActivatedRoute) {
        // console.log(this.route); <- apenas para descobrir como ele se apresenta como objeto e seus parâmetros.
        this.id = this.route.snapshot.params['id'];
     }

    ngOnInit(): void {
    }

}
