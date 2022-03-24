import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlunosService } from '../alunos.service';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';

@Component({
    selector: 'app-aluno-form',
    templateUrl: './aluno-form.component.html',
    styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy, IFormCanDeactivate {

    aluno: any = {};
    inscricao: Subscription = new Subscription();
    private formMudou: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private alunosService: AlunosService
    ) { }

    ngOnInit(): void {
        this.inscricao = this.route.params.subscribe(
            (params: any) => {
                let id = params['id'];

                this.aluno = this.alunosService.getAluno(id);

                if (this.aluno === null){
                    this.aluno = {};
                }
            }
        )
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }

    onInput(){
        this.formMudou = true;
    }

    podeMudarRota(){
        if (this.formMudou){
            return confirm('Tem certeza que deseja sair dessa página?');
        }
        return true;
    }

    podeDesativar(): boolean | Observable<boolean> {
        return this.podeMudarRota();
    }
    // Assim cada componente pode ter sua lógica específica para deixar mudar a rota.

}
