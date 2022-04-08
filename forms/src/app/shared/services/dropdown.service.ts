import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): Observable<EstadoBr[]>  {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
    
        // Não funcionou:
        // .pipe(map((dados) => {
        //     dados;
        // }), tap(console.log));
  }
  getCargos(){
      return [
          { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
          { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
          { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
      ]
  }
}
