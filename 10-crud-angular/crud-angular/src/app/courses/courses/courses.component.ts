import { Observable, catchError, of } from 'rxjs';
import { CoursesService } from './../services/courses.service';
import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

    // Não é recomendado tipar como any.

    /*
    O angular Material pode receber um array ou um Observable na Table.
    Assim, ele trata esse observable.
    De outra forma, teríamos que fazer um subscribe, um ng-for, 
    .list().subscribe(courses => this.courses = courses)
    Se nossa variável fosse um array de cursos tá.

    Outra forma seria usar o pipe async no template no ng-for. Aí ele
    faz o subscribe automático.

    Sempre que possível, a gente evita fazer o subscribe e deixa o Angular tratar disso
    ele mesmo.
    */


    courses$: Observable<Course[]>;
    displayedColumns = ['name', 'category'];

    constructor(
        private coursesService: CoursesService,
        public dialog: MatDialog
        ) {
        this.courses$ = this.coursesService.list().pipe(
            catchError(error => {
                this.onError('Erro ao carregar cursos.');
                return of([]) // O operador of retorna um Observable de qualquer tipo, no caso, de um array vazio.
            })
        );
     }

    ngOnInit(): void {
        
    }

    onError(errorMsg: string) {
        this.dialog.open(ErrorDialogComponent, {
            data: errorMsg
          });
    }

}
