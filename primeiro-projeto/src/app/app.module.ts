// Módulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CursosModule } from './cursos/cursos.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


// Classes do nosso projeto
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { MeuSegundoComponent } from './meu-segundo/meu-segundo.component';

@NgModule({
    declarations: [
        // Componentes, diretivas e pipas
        AppComponent,
        MeuPrimeiroComponent,
        MeuSegundoComponent
    ],
    imports: [
        // Outros módulos
        BrowserModule,
        AppRoutingModule,
        CursosModule
    ],
    providers: [], // Serviços que ficarão de escopo para este módulo, AppModule.
    bootstrap: [AppComponent] // Componente principal, que servirá como container da aplicação.
})
export class AppModule { }
