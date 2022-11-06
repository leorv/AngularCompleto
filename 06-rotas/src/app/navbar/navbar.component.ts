import { Component, OnInit } from '@angular/core';

import { AuthService } from '../login/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    mostrarMenu: boolean = false;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.authService.mostrarMenuEmitter.subscribe(
            (mostrar: any) => {
                this.mostrarMenu = mostrar;
            }
        );
    }

}
