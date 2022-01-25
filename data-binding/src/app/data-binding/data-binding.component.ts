import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-data-binding',
    templateUrl: './data-binding.component.html',
    styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

    url: string = 'https://loiane.training';
    imgUrl: string = 'https://picsum.photos/200/300';
    cursoAngular: boolean = true;
    valorAtual: string = '';
    valorSalvo: string = '';

    isMouseOver: boolean = false;

    nome: string = 'leo';

    pessoa: any = {
        nome: 'leo',
        idade: 20
    }

    constructor() { }

    ngOnInit(): void {
    }

    atualizaNome(evento: Event){
        this.nome = (<HTMLInputElement>evento.target).value;
    }

    getCurtirCurso() {
        return true;
    }


    getValor() {
        return 1;
    }

    botaoClicado() {
        alert('Botão clicado!')
    }

    onkeyup(evento: Event) {
        console.log("onkeyup: ", evento);
        // console.log((<HTMLInputElement>evento.target).value);
        this.valorAtual = (<HTMLInputElement>evento.target).value;
        // this.valorAtual = texto;
    }

    salvarValor(evento: any){
        console.log("salvarValor: ", evento);
        this.valorSalvo = evento;
    }

    onMouseOverOut() {
        this.isMouseOver = !this.isMouseOver;
    }

    

}
