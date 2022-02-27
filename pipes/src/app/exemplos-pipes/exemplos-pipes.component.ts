import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs';

@Component({
    selector: 'app-exemplos-pipes',
    templateUrl: './exemplos-pipes.component.html',
    styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {
    livros: string[] = ['Java', 'Angular 12'];

    filtro: string = '';

    addCurso(value: string) {
        console.log('adicionando novo curso');
        this.livros.push(value);
    }

    obterCursos() {
        if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === '') {
            return this.livros;
        }

        return this.livros.filter(
            (v) => {
                if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
                    return true;
                }
                return false;
            }
        );
    }


    livro: any = {
        titulo: 'Estruturas de Dados e Algoritmos com JavaScript: Escreva um Código JavaScript Complexo e Eficaz Usando a Mais Recente ECMAScript',
        rating: 4.54321,
        numeroPaginas: 408,
        preco: 65.99,
        dataLancamento: new Date(2019, 3, 11),
        url: 'https://www.amazon.com.br/Estruturas-Dados-Algoritmos-Com-Javascript/dp/8575226932'
    }

    // Na programação assíncrona, você pode decidir o que usar, se promisses ou observables.

    valorAsync = new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve('Valor assíncrono');
        }, 2000);
    });

    valorAsync2 = interval(2000).pipe(map(value => 'Valor assíncrono 2'));

    constructor() { }

    ngOnInit(): void {
    }



}
