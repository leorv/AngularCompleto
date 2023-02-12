import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[highlight]'
})
export class HighlightDirective {

    @HostListener('mouseenter') onMouseOver() {
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.backgroundColor = this.defaultColor;
    }

    @HostBinding('style.backgroundColor') backgroundColor: string = '';


    @Input() defaultColor: string = '';
    @Input('highlight') highlightColor: string = 'yellow';

    // Acima estamos utilizando um seletor com o mesmo nome da diretiva. O Angular é inteligente o suficiente
    // para saber que no template no elemento html que está, é uma diretiva e ao mesmo tempo é o nome de uma
    // Input Property da diretiva.
    // Não há necessidade disso, mas isso é possível.

    constructor() { }

    // Para termos o texto com o background correto quando iniciarmos.
    ngOnInit(): void {
        this.backgroundColor = this.defaultColor;        
    }

}
