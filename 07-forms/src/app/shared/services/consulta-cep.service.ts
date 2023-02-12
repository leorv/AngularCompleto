import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConsultaCepService {

    constructor(private http: HttpClient) { }

    consultaCEP(cep: string) {
        // Verificar se o CEP tem somente dígitos.
        cep = cep.replace(/\D/g, '');

        if (cep != "") {
            var validaCEP = /^[0-9]{8}$/;

            if (validaCEP.test(cep)) {
                return this.http.get(`//viacep.com.br/ws/${cep}/json`)
                    .pipe(map((dados: any) => dados), tap(console.log));
            }
        }
        return of({});
    }
}
