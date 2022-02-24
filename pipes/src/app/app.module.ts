import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';

import { CamelCasePipe } from './camel-case.pipe';

import { SettingsService } from './settings.service';

// Para trabalhar com o Settings mandando a informação pt-BR
// só funcionou adicionando as 3 linhas abaixo.
import {registerLocaleData} from '@angular/common';
import br from '@angular/common/locales/pt';
import { FiltroArrayPipe } from './filtro-array.pipe';
registerLocaleData(br, 'pt-BR');

@NgModule({
    declarations: [
        AppComponent,
        ExemplosPipesComponent,
        CamelCasePipe,
        FiltroArrayPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        // {
        //     provide: LOCALE_ID,
        //     // Existem 3 formas da gente fazer essa injeção de dependência:
        //     useValue: 'pt-BR'
        //     // useClass: , 
        //     // useFactory: 
        // }

        // O mesmo efeito do de cima, porém, se fosse necessário usar um serviço para obter o local.
        SettingsService,
        {
            provide: LOCALE_ID,
            deps: [SettingsService],
            useFactory: (settingsService: any) => settingsService.getLocale()            
        }
        /*
Na versão 12 do Angular (e seguindo a doc) pode somente:

import { LOCALE_ID, NgModule } from '@angular/core';

import '@angular/common/locales/global/pt';


E no providers:

providers: [ { provide: LOCALE_ID, useValue: 'pt' } ]
        */
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
