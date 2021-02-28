import { Observable } from 'rxjs';
import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Observable<User[]>;
  nome: String;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.readAllUsers();
  }

  readAllUsers(): void {
    this.usuarioService.readAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: Number) {
    this.usuarioService.deleteUserById(id).subscribe(data => {
      this.readAllUsers();
    });
  }

  readUserByName() {
    this.usuarioService.readUserByName(this.nome).subscribe(data => {
      this.users = data;
    });
  }
}