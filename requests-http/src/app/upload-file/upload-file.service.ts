import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    constructor(private http: HttpClient) { }

    upload(files: Set<File>, url: string){
        const formData = new FormData();
        files.forEach(file => formData.append('file',file, file.name));

        // const request = new HttpRequest('POST', url, formData);
        // return this.http.request(request);
        return this.http.post(url, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            catchError(this.errorMgmt)
        );
    }

    errorMgmt(error: HttpErrorResponse){
        let errorMessage = '';

        if (error.error instanceof ErrorEvent){
            // get cliente side error
            errorMessage = error.error.message;
        } else {
            // get server side error
            errorMessage = `Error code: ${error.status} \n Message: ${error.message}`;
            console.log(error);
        }
        console.log(error.message);
        return throwError(() => new Error(errorMessage));
    }
}
