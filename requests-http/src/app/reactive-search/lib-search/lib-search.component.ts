import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { filter } from 'rxjs';
import { map, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../search.service';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-lib-search',
    templateUrl: './lib-search.component.html',
    styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

    queryField: FormControl = new FormControl;

    results$: Observable<any> = new Observable();
    total: number = 0;

    readonly fields: string = 'name,description,version,alternativeNames,license,homepage,repository,author,originalName';

    constructor(
        private searchService: SearchService
    ) { }

    ngOnInit(): void {
        // this.results$ = 
        this.results$ = this.queryField.valueChanges
            .pipe(
                map(value => value.trim()),
                filter(value => value.length > 1),
                debounceTime(300),
                distinctUntilChanged(),
                tap(value => console.log(value)),
                switchMap(value => this.searchService.getLibs({
                    search: value,
                    fields: this.fields
                })),
                tap((res: any) => this.total = res.total),
                map((res: any) => res.results)
            );
    }

    onSearch() {
        // console.log(this.queryField.value);
        let value: string = this.queryField.value;
        // const fields: string = 'name,description,version,alternativeNames,license,homepage,repository,author,originalName';

        if (value && value.trim() != '') {
            value = value.trim();

            const params = {
                search: value,
                fields: this.fields
            }

            // let params = new HttpParams();
            // params = params.set('search', value);
            // params = params.set('fields', fields);

            this.results$ = this.searchService.getLibs(params)
                .pipe(
                    tap((res: any) => this.total = res.total),
                    map((res: any) => res.results)
                );
        }


    }

}
