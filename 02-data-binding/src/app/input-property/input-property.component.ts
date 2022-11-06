import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.css']//,
//   inputs: [
//       'nomeCurso:nome'
//   ]
// Acima é uma outra forma de fazermos o input para as variáveis, porém não é recomendável
// já que com muitas variáveis pode ficar confuso. O recomendável mesmo é fazer como abaixo,
// em cada uma com seu input.
})
export class InputPropertyComponent implements OnInit {

    // Podemos internamente usar a variável nomeCurso e externamente expor como 'nome'.
    @Input('nome') nomeCurso: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}