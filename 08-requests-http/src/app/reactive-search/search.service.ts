import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    readonly SEARCH_URL: string = 'https://api.cdnjs.com/libraries';

    constructor(private http: HttpClient) { }

    getLibs(params: { search:string, fields:string}){
            return this.http.get(this.SEARCH_URL, {params}); 
    }

}
