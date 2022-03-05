import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
    pagina: number = 0;
    cursos: any[] = [];
    inscricao: Subscription = new Subscription();

  constructor(
      private cursosService: CursosService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit(): void {
      this.cursos = this.cursosService.getCursos();
      this.inscricao = this.route.queryParams.subscribe(
          (queryParams: any) => {
              this.pagina = queryParams['pagina'];
          }
      );
  }

  ngOnDestroy(): void {
      this.inscricao.unsubscribe();
  }

  proximaPagina(){
      // this.pagina++;
      this.router.navigate(['/cursos'], {queryParams: {pagina: ++this.pagina} });
  }

}
