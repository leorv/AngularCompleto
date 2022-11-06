import { Aluno } from './../aluno';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlunosService } from '../alunos.service';

@Component({
    selector: 'app-aluno-detalhe',
    templateUrl: './aluno-detalhe.component.html',
    styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

    aluno: Aluno = new Aluno(0,'','');
    inscricao: Subscription = new Subscription();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alunosService: AlunosService
    ) { }

    ngOnInit(): void {
        // this.inscricao = this.route.params.subscribe(
        //     (params:any) => {
        //         let id = params['id'];
        //         this.aluno = this.alunosService.getAluno(id);
        //     }
        // );

        this.inscricao = this.route.data.subscribe(
            (info: any) => {
                console.log(info);
                this.aluno = info.aluno;
            }
        );

    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();        
    }

    editarAluno(){
        this.router.navigate(['/alunos', this.aluno.id, 'edit']);
    }



}
