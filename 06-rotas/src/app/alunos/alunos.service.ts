import { Injectable } from '@angular/core';
import { Aluno } from './aluno';

@Injectable({
    providedIn: 'root'
})
export class AlunosService {

    private alunos: Aluno[] = [
        {id: 1, nome: 'Leonardo', email: 'leonardo@hotmail.com'},
        {id: 2, nome: 'Vanessa', email: 'vanessa@hotmail.com' },
        {id: 3, nome: 'Carol', email: 'carolina@hotmail.com'},
        {id: 4, nome: 'Felipe', email: 'felipe@tray.com'},
        {id: 5, nome: 'Loiane', email: 'loiane@hotmail.com'}
    ];

    constructor() { }

    getAlunos() {
        return this.alunos;
    }

    getAluno(id: number) {
        for (let i=0; i< this.alunos.length; i++){
            let aluno = this.alunos[i];
            if (aluno.id == id){
                return aluno;
            }
        }
        return null;
    }
}
