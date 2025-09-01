import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-login',
    imports: [
        FormsModule,
        CommonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.clean();
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = "用户名或密码错误";
        this.isLoginFailed = true;
        console.error(err.error)
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
