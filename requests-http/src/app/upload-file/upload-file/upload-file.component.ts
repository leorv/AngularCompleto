import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

    files: Set<File> = new Set<File>();
    subcription: Subscription = new Subscription();

    progress: number = 0;

    constructor(private uploadFileService: UploadFileService) { }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
    }

    onChange(event: any) {
        const selectedFiles = <FileList>event.files;
        // em versões anteriores: const selectedFiles = <FileList>event.srcElement.files

        // No caso do bootstrap 5,o nome do arquivo aparece automaticamente no campo de seleção
        // do arquivo.
        // Porém, em versões anteriores isso não acontece. Então faria o seguinte, dando um id para
        // o elemento input no template e:
        // document.getElementById('customFieldLabel')?.innerHTML = selectedFiles[0].name;

        for (let i = 0; i < selectedFiles.length; i++) {
            this.files.add(selectedFiles[i]);
        }
    }

    onUpload() {
        if (this.files && this.files.size > 0) {
            this.subcription = this.uploadFileService.upload(this.files, '/api/upload')
                .subscribe({
                    next: (event: HttpEvent<Object>) => {
                        // HttpEventType
                        console.log('evento:', event);
                        switch (event.type) {
                            case HttpEventType.Sent:
                                console.log('Request has been made!');
                                break;
                            case HttpEventType.ResponseHeader:
                                console.log('Response header has been received!');
                                break;
                            case HttpEventType.UploadProgress:
                                var eventTotal = event.total ? event.total : 0;
                                this.progress = Math.round(event.loaded / eventTotal * 100);
                                console.log(`Uploaded! ${this.progress}%`);
                                break;
                            case HttpEventType.Response:
                                console.log('File Upload Successfully!', event.body);
                                setTimeout(() => {
                                    this.progress = 0;
                                }, 1500);
                        };
                        // if (event.type === HttpEventType.Response) {
                        //     console.log('Upload concluído.');
                        // }
                        // else if (event.type === HttpEventType.UploadProgress) {
                        //     if (event.total) {
                        //         const percentDone = Math.floor((event.loaded * 100) / event.total);
                        //         console.log('Progresso: ', percentDone);
                        //         this.progress = percentDone;
                        //     }
                        // }
                    },
                    error: err => console.log('Ocorreu um erro ao fazer upload. Tente novamente.')
                });
        }
    }

    OnDestroy() {
        this.subcription.unsubscribe();
    }

}
