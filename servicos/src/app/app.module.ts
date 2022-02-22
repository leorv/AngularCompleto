import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CriarCursoModule } from './criar-curso/criar-curso.module';
import { CursosModule } from './cursos/cursos.module';

// import { CursosService } from './cursos/cursos.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CriarCursoModule,
    CursosModule
  ],
//   providers: [
//       CursosService
//   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Aqui tiramos o CursosService do app-module, e o colocamos nos outros dois módulos,
// cursos-module e criar-cursos-module, mesmo assim, a aplicação vai instanciar apenas
// um CursosService, este é o padrão Singleton.

// Se queremos apenas fazer com que um componente tenha acesso ao serviço:
// @Component({
//     selector: 'app-cursos',
//     templateUrl: './cursos.component.html',
//     styleUrls: ['./cursos.component.css'],
//     providers: [CursosService]
// })
// Porém, assim ele irá criar uma instância separada para o componente. Teremos duas
// instâncias do CursosService.
// Se criarmos um curso novo em uma dessas instâncias, a outra não saberá.
// Porém, utilizando o padrão Singleton, ao alterarmos uma instância, toda a
// aplicação que usa ela sofrerá a alteração.