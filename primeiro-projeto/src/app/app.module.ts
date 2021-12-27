import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosModule } from './cursos/cursos.module';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { MeuPrimeiro2Component } from './meu-primeiro2/meu-primeiro2.component';




@NgModule({
  declarations: [ // Componentes, diretivas e pipes.
    AppComponent,
    MeuPrimeiroComponent,
    MeuPrimeiro2Component
  ],
  imports: [ // Outros módulos
    BrowserModule,
    CursosModule,
    AppRoutingModule
  ],
  providers: [], // Serviços que ficarão disponíveis.
  bootstrap: [AppComponent]
})
export class AppModule { }