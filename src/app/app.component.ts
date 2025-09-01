import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {StorageService} from "./services/storage.service";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {Usuario} from "./interfaces/usuario";
import {UsuarioService} from "./services/usuario.service";
import {FormsModule} from "@angular/forms";
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    imports: [SidebarComponent, RouterOutlet, CommonModule, LoginComponent, FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'app-proyecto';

  isLoggedIn  = false;
  usuario:Usuario;
  contraseniaAntigua: string="";
  nuevacontrasenia: string="";
  confirmarcontrasenia: string="";
  constructor(private usuarioService:UsuarioService, private storageService: StorageService,private router: Router) {
    this.usuario=storageService.getUser().content;
  }
  logout() {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.router.navigate(['/login']).then(
      () => {console.log('Logout OK, cargando login...')}
    )
  }
  abrirModal() {
    this.contraseniaAntigua = "";
    this.nuevacontrasenia = "";
    this.confirmarcontrasenia = "";
  }
  cambiarcontrasenia(){
    if (this.nuevacontrasenia !== this.confirmarcontrasenia) {
      return;
    }
    this.usuarioService.cambiarContrasenia(this.contraseniaAntigua,this.nuevacontrasenia).subscribe({
      next(){
        alert("Contraseña cambiada correctamente")
      },error(error){
        alert(error)
      }
    })
  }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

}
