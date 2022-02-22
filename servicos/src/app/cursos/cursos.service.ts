import { Injectable } from "@angular/core";

@Injectable()
export class CursosService {

    private cursos: string[] = ['Angular 2', 'Java', 'Phonegap'];

    constructor(){
        // Só será exibido este log apenas uma vez.
        // Já que a classe de serviço é instanciada apenas uma vez
        // como está no provider do app module.
        console.log('CursosService');
    }

    getCursos(){
        return this.cursos;
    }

    addCurso(curso: string){
        this.cursos.push(curso);
    }

}