import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Curso } from './curso';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CursosCrudService extends CrudService<Curso> {

    constructor(protected override http: HttpClient) {
        super(http, `${environment.API}cursos`);
    }
}
