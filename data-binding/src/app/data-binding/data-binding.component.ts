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


    getCurtirCurso() {
        return true;
    }


    getValor() {
        return 1;
    }

    constructor() { }

    ngOnInit(): void {
    }

}
