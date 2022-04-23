import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

    constructor(private cursoService: CursosService) { }

    ngOnInit(): void {
        // this.cursoService.list().subscribe(
        //     dados => this.cursos = dados
        // );
        this.cursos$ = this.cursoService.list();
    }

}
