import { EventEmitter, Injectable } from "@angular/core";

import { LogService } from "../shared/log.service";

@Injectable()
export class CursosService {

    emitirCrusoCriado = new EventEmitter<string>();
    // Esta variável será somente da instância em si.

    static criouNovoCurso = new EventEmitter<string>();
    // Esta variável pode ser compartilhada entre todas as
    // instâncias do serviço.

    private cursos: string[] = ['Angular 2', 'Java', 'Phonegap'];

    constructor( private logService: LogService){
        console.log('CursosService');
    }

    getCursos(){
        this.logService.consoleLog('Obtendo lista de cursos.');
        return this.cursos;
    }

    addCurso(curso: string){
        this.logService.consoleLog(`Criando um novo curso: ${curso}`);
        this.cursos.push(curso);
        this.emitirCrusoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);
    }

}