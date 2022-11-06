import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'contador',
    templateUrl: './output-property.component.html',
    styleUrls: ['./output-property.component.css']//,
    // outputs: ['mudouValor]
})
export class OutputPropertyComponent implements OnInit {

    @Input() valor: number = 0;

    @Output() mudouValor = new EventEmitter();

    // Primeiramente fizemos o campoValorInput tendo o tipo HTMLElement, depois inspecionando
    // vimos que seu time era ElementRef, então inserimos corretamente abaixo, passando o input
    // como nativeElement.
    @ViewChild('campoInput') campoValorInput: ElementRef = new ElementRef('input');

    incrementa() {
        console.log(this.campoValorInput.nativeElement.value);
        this.campoValorInput.nativeElement.value++;
        this.mudouValor.emit({novoValor: this.campoValorInput.nativeElement.value});
    }

    decrementa() {
        console.log(this.campoValorInput.nativeElement.value);
        this.campoValorInput.nativeElement.value--;
        this.mudouValor.emit({novoValor: this.campoValorInput.nativeElement.value});
    }

    constructor() { }

    ngOnInit(): void {
    }

}
