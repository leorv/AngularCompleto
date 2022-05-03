import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

    constructor() { }

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
        
    }

}
