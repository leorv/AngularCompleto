import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VerificaEmailService {

    constructor(private http: HttpClient) { }

    verificarEmail(email: string) {
        return this.http.get('assets/dados/verificarEmail.json')
            .pipe(
                delay(2000),    
                // map((dados: {emails: any[]}) => dados.emails)
                // Eu poderia usar da forma acima também, mas no Angular 13 não é possível.
                // Apenas para sabermos com o autocomplete as propriedades e métodos que possue o tipo.
                // Por algum motivo estranho o Angular deixou ser escrito da maneira abaixo e não da maneira acima.
                // map((dados: {email: string}[]) => dados.filter(v => v.email === email))
                map((dados: any) => dados.emails),
                // tap(console.log),
                map((dados: {email: string}[]) => dados.filter(v => v.email === email)),
                // tap(console.log),
                map((dados: any) => dados.length > 0),
                // tap(console.log)
            );
    }
}
