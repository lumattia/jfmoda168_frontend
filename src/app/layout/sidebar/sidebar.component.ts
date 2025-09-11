import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [RouterLink, RouterLinkActive, NgIf],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

    mobileView: boolean = false;
    ngOnInit() {
        this.checkMobile();

        window.addEventListener('resize', () => this.checkMobile());
    }
    checkMobile() {
        // Consideramos móvil si la pantalla tiene menos o igual a 1000px de ancho
        this.mobileView = window.innerWidth <= 1000;
        console.log(this.mobileView)
        console.log(window.innerWidth)
    }
}
