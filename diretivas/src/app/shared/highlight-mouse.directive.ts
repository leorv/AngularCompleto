// Aqui primeiro resolvemos com o renderer, depois resolvemos com o hostbinding,
// e por fim, colocamos um método para setar a cor, apenas como outra alternativa
// de solução.
import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
    selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

    @HostListener('mouseenter') onMouseOver() {
        // this.renderer.setStyle(
        //     this.elementRef.nativeElement,
        //     'background-color',
        //     'yellow');
        this.backgroundColor = 'yellow';
    }

    @HostListener('mouseleave') onMouseLeave() {
        // this.renderer.setStyle(
        //     this.elementRef.nativeElement,
        //     'background-color',
        //     'white');
        this.backgroundColor = '';
    }

    // @HostBinding('style.backgroundColor') backgroundColor: string = '';
    // Pode ser feito usando o HostBinding como acima, ou se preferir
    // pode também fazer com um método setando a cor. Daí cria também a
    // variável private backgroundColor.

    @HostBinding('style.backgroundColor') get setColor(){
        // código extra
        return this.backgroundColor;
    }

    private backgroundColor: string = '';



    constructor(
        // private elementRef: ElementRef,
        // private renderer: Renderer2
    ) { }

}
