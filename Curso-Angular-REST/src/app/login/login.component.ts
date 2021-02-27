import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = { login: '', senha: '' }

  constructor(private loginService: LoginService) {

  }

  public login() {
    this.loginService.login(this.usuario);
    // console.log("Teste de login: " + this.usuario.login + " senha: " + this.usuario.senha);
  }

  ngOnInit(): void {
  }

}
