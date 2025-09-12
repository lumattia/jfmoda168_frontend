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
        this.mobileView = window.innerWidth <= 1000;
    }
}
