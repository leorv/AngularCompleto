import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';
import { Cidade } from '../models/cidade';

@Injectable({
    providedIn: 'root'
})
export class DropdownService {

    constructor(private http: HttpClient) { }

    getEstadosBr(): Observable<EstadoBr[]> {
        return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json')
            .pipe(
                map(dados => dados)
            );
    }

    getCidadesBr(idEstado: number) {
        return this.http.get<Cidade[]>('assets/dados/cidades-br.json')
            .pipe(
                map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
            );
    }

    getCargos() {
        return [
            { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
            { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
            { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
        ]
    }

    getTecnologias() {
        return [
            { nome: 'java', desc: 'Java' },
            { nome: 'angular', desc: 'Angular' },
            { nome: 'vuejs', desc: 'VueJS' },
            { nome: 'reactjs', desc: 'ReactJS' },
            { nome: 'c#', desc: 'C#' },
            { nome: 'ruby', desc: 'Ruby' }
        ]
    }

    getNewsletter() {
        return [
            { valor: 's', desc: 'Sim' },
            { valor: 'n', desc: 'Não' }
        ]
    }
}
