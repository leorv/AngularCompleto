import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-exemplos-pipes',
    templateUrl: './exemplos-pipes.component.html',
    styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

    livro: any =  {
        titulo: 'Estruturas de Dados e Algoritmos com JavaScript: Escreva um Código JavaScript Complexo e Eficaz Usando a Mais Recente ECMAScript',
        rating: 4.54321,
        numeroPaginas: 408,
        preco: 65.99,
        dataLancamento: new Date(2019, 3, 11),
        url: 'https://www.amazon.com.br/Estruturas-Dados-Algoritmos-Com-Javascript/dp/8575226932'
    }

    constructor() { }

    ngOnInit(): void {
    }

}
