import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

import { Course } from './../model/course';
import { HttpClient } from '@angular/common/http'
import { first, Observable, take, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    private readonly API: string = '/assets/courses.json';

    constructor(private http: HttpClient) { }

    list(): Observable<Course[]> {
        return this.http.get<Course[]>(this.API)
            .pipe(
                first(),
                // take(1),
                // O first obtém apenas a primeira resposta que o servidor enviar.
                // Como neste caso o servidor não é nenhum stream de dados, basta
                // pegarmos os cursos uma única vez quando atualizarmos a página.
                tap(courses => console.log(courses))
            );
    }
}
