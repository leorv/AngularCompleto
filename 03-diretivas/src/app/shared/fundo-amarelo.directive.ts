import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[fundoAmarelo]'
    // selector: 'p[fundoAmarelo]' ==> seria aplicada somente no parágrafo (p)
    // selector: 'button[fundoAmarelo]' ==> seria aplicada somente em botão (button)
})
export class FundoAmareloDirective {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        //   console.log(this.elementRef);
        // Há um pequeno disclaimer pedindo para evitar usar o elementRef na documentação,
        // porque nós estamos fazendo acesso diretamente ao nosso DOM, isso dá margem para
        // ataques e o nosso sistema fica vulnerável, por exemplo para ataques xxs.
        // this.elementRef.nativeElement.style.backgroundColor = 'yellow';

        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'yellow');
    }
}
