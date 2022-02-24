import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
    selector: 'app-cursos',
    templateUrl: './cursos.component.html',
    styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

    cursos: string[] = [];

    // cursosService: CursosService;

    constructor(private cursosService: CursosService) {
        // this.cursosService = new CursosService();
        // this.cursosService = _cursosService;
     }

    ngOnInit(): void {
        this.cursos = this.cursosService.getCursos();

        CursosService.criouNovoCurso.subscribe(
            curso => this.cursos.push(curso)
        );

        // this.cursosService.emitirCrusoCriado.subscribe(
        //     curso => console.log(curso),
        //     // é o mesmo que fazer:
        //     // function(curso){
        //     //     console.log(curso);
        //     // }
        // );
        // Esta inscrição aqui é muito similar ao que acontece em um canal
        // do youtube, quando nos inscrevemos num canal do youtube, quando
        // ele faz o upload de um novo vídeo, somos avisados.
        // É exatamente essa mesma lógica que queremos utilizar aqui.

        // Se você quiser fazer um broadcast de eventos da sua aplicação
        // você pode ter um serviço com event emitter estático.

    }

}
