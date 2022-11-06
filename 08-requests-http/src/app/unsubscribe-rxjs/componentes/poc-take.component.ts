import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviarValorService } from '../enviar-valor.service';
import { tap, take } from 'rxjs/operators';

@Component({
    selector: 'app-poc-take',
    template: `
    <app-poc-base [nome]="nome"
      [valor]="valor" estilo="bg-info">
    </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit, OnDestroy {

    nome = 'Componente com take';
    valor: string = '';

    constructor(private service: EnviarValorService) { }

    ngOnInit() {
        this.service.getValor()
        .pipe(
            tap(v => console.log(this.nome, v)),
            take(1)
            // Neste caso ele faz uma requisição ao servidor, pega o valor apenas uma vez
            // e não se atualiza mais, se completa por isso mesmo.
            // Bom para chamadas http onde o backend não é reativo.
        )
        .subscribe(novoValor => this.valor = novoValor);
    }

    ngOnDestroy(): void {
        console.log(`${this.nome} foi destruído.`);
    }
}