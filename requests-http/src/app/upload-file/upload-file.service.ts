import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    constructor(private http: HttpClient) { }

    upload(files: Set<File>, url: string) {
        const formData = new FormData();
        files.forEach(file => formData.append('file', file, file.name));

        // const request = new HttpRequest('POST', url, formData);
        // return this.http.request(request);
        return this.http.post(url, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            catchError(this.errorMgmt)
        );
    }

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
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

    download(url: string) {
        return this.http.get(url, {
            responseType: 'blob'
            // responseType: 'blob' as 'json' // se quiser pegar informações, inclusive
            // se quiser saber o progresso dos downloads.
            // pode pedir aqui também para fazer o report progress aqui.
            // mas para o report progress o seu back-end tem que setar o
            // content-length, pois o Angular não tem bola de cristal para saber
            // o tamanho completo do arquivo.
        })
    }

    handleFile(response: any, fileName: string) {
        const file = new Blob([response], { type: response.type });

        // Verificar se é IE
        if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
            (window.navigator as any).msSaveOrOpenBlob(file);
            return;
        }

        const blob = window.URL.createObjectURL(file);

        const link = document.createElement('a');
        link.href = blob;
        link.download = 'fileName';
        link.click(); // Nas versões mais atuais do firefox esse link.click nao funciona.
        // Para firefox: Não usar o link.click, e sim:
        // link.dispatchEvent(new MouseEvent('click', {
        //     bubbles: true,
        //     cancelable: true,
        //     view: window
        // }))

        // para firefox, para ele realmente ser removido.
        setTimeout(() => {
            window.URL.revokeObjectURL(blob);
            link.remove();
        }, 200);
    }
}
