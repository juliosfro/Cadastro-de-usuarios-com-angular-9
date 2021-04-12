import { Router } from '@angular/router';
import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = { login: '', senha: '' }

  constructor(private loginService: LoginService, private router: Router) {

  }

  public login() {
    this.loginService.login(this.usuario);
    // console.log("Teste de login: " + this.usuario.login + " senha: " + this.usuario.senha);
  }

  public recuperaLogin(): void {
    this.loginService.recuperaLogin(this.usuario.login);
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null && localStorage.getItem("token").toString().trim() !== null) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
