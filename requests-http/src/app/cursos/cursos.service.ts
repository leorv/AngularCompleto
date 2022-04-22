import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { environment } from './../../environments/environment';
import { Curso } from './curso';

@Injectable({
    providedIn: 'root'
})
export class CursosService {

    private readonly API: string = `${environment.API}cursos`;

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<Curso[]>(this.API)
            .pipe(
                tap(console.log)
            );
    }
}
