import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

    files: Set<File> = new Set<File>();
    subcription: Subscription = new Subscription();

    constructor(private uploadFileService: UploadFileService) { }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
    }

    onChange(event: any) {
        console.log(event);
        console.log(event.files);

        const selectedFiles = <FileList>event.files;
        // em versões anteriores: const selectedFiles = <FileList>event.srcElement.files

        // No caso do bootstrap 5,o nome do arquivo aparece automaticamente no campo de seleção
        // do arquivo.
        // Porém, em versões anteriores isso não acontece. Então faria o seguinte, dando um id para
        // o elemento input no template e:
        // document.getElementById('customFieldLabel')?.innerHTML = selectedFiles[0].name;

        for (let i = 0; i < selectedFiles.length; i++){
            this.files.add(selectedFiles[i]);
        }

    }

    onUpload() {
        if (this.files && this.files.size > 0){
            this.subcription = this.uploadFileService.upload(this.files, 'http://localhost:8000/upload')
                .subscribe({
                    next: response => console.log('upload concluído.'),
                    error: err => console.log('Ocorreu um erro ao fazer upload. Tente novamente.')
                });
        }
    }

    OnDestroy(){
        this.subcription.unsubscribe();
    }

}
