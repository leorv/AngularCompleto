import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs';

import { environment } from './../../environments/environment';
import { Curso } from './curso';

@Injectable({
    providedIn: 'root'
})
export class CursosService {

    private readonly API: string = `${environment.API}cursos`;

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<Curso[]>(this.API)
            .pipe(
                // Utilizaremos esse delay apenas para simular que a requisição está
                // sendo feito e existe um tempo para o servidor retornar, fazendo a
                // gente implementar uma mensagem de carregamento no template.
                delay(2000),
                tap(console.log)
            );
    }

    create(curso: Curso){
        return this.http.post(this.API, curso).pipe(take(1)); // Como estamos utilizando Ajax simples, não tem
        // necessidade de ficarmos utilizando observables.
        // Exceto se nosso back-end fosse reativo, aí não precisaria do take, ficaria escutando sempre.
        // Não precisamos então colocar aqueles mecanismos para se desinscrever, o take vai fazer isso
        // automaticamente.
    }
}
