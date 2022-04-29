import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

enum AlertTypes {
    DANGER = 'danger',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFO = 'info'
}

@Injectable({
    providedIn: 'root'
})
export class AlertModalService {

    constructor(
        private modalService: BsModalService
    ) { }

    private showAlert(message: string, type: AlertTypes, dismissTimeOut?: number){
        const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
        bsModalRef.content.type = type;
        bsModalRef.content.message = message;

        if (dismissTimeOut){
            setTimeout(() => {
                bsModalRef.hide();
            }, dismissTimeOut);
        }
    }

    showAlertDanger(message: string){
        this.showAlert(message, AlertTypes.DANGER, 3000);
    }

    showAlertSuccess(message: string){
        this.showAlert(message, AlertTypes.SUCCESS);
    }

    showAlertInfo(message: string){
        this.showAlert(message, AlertTypes.INFO);
    }

    showAlertWarning(message: string){
        this.showAlert(message, AlertTypes.WARNING);
    }
}
