import { LoginService } from './service/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Curso de Angular com API REST';
  usuario = { login: '', senha: '' }

  constructor(private loginService: LoginService) {

  }

  public login() {
    this.loginService.login(this.usuario);
    // console.log("Teste de login: " + this.usuario.login + " senha: " + this.usuario.senha);
  }

}