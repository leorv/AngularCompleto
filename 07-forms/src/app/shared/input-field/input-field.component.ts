import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent), // (forwardRef) Para podermos usar a classe antes de sua declaração. 
    multi: true//,
    // host: {
    //     '(change)': 'onChangeCallback($event.target.value)',
    //     '(blur)': 'onTouchedCallback()'
    // }
};

@Component({
    selector: 'app-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.css'],
    providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {
    // Podemos colocar o aplicaCSSErro diretamente neste componente, ou
    // inseri-lo como um input, neste caso vamos inserir como input.
    @Input() classeCss: any;
    // Para controlarmos o for e id:
    @Input() id: string = '';
    @Input() label: string = '';
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
    @Input() control: any;

    private innerValue: any;
    get value() {
        return this.innerValue;
    }
    set value(v: string) {
        if (v !== this.innerValue) {
            this.innerValue = v;
        }
    }
    onChange: (value: any) => void = () => {};
    onTouched: () => void = () => {};
    @Input() isReadOnly: boolean = false; // To disable

    writeValue(value: string): void {
        // this.value = value ? value : '';
        // Método responsável por setar o valor. Ex: Quando a gente faz campo.value
        // Poderia ao invés do abaixo, fazer somente: this.value(v);
        if (value !== this.innerValue) {
            this.value = value;
            // this.onChange(v);
        }
    }
    registerOnChange(fn: any): void {
        // Método responsável para falar para o Angular toda vez que o valor muda,
        // lembrando que cada campo tem o stateChanges e o valueChanges que a gente pode escutar.
        // Então a gente precisa falar para o Angular sempre que o campo mudar.
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        // Aqui a gente vai falar para o Angular toda vez que esse campo ganhar foco.
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean) {
        // Método responsável para falar para o Angular quando este campo está desabilitado,
        // daí o usuário não pode inputar nenhum valor.
        this.isReadOnly = isDisabled;
    }
}
