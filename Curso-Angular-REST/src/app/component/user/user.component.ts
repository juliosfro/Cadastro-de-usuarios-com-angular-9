import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  pagina_atual = 1;
  users: Array<User[]>;
  nome: String;
  total: Number;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    /* No front-end a primeira página é a número 1 e no banco de dados é a numero 0 */
    this.carregarUsuarioPaginado(1);
  }

  deleteUserById(id: Number, index: number) {
    if (confirm('Deseja remover esse usuário?')) {
      this.usuarioService.deleteUserById(id).subscribe(data => {
        this.users.splice(index, 1);
      });
    }
  }

  readUserByName() {
    if (this.nome === undefined || this.nome.trim() === "") {
      this.pagina_atual = 1;
      this.usuarioService.readAllUsersPage((this.pagina_atual - 1)).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.carregarUsuarioPaginado(this.pagina_atual);
    }
  }

  carregarUsuarioPaginado(pagina: number): void {
    if (this.nome !== undefined && this.nome.trim() !== "") {
      this.usuarioService.readUserByNamePage(this.nome, pagina - 1).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;

        if (this.pagina_atual > data.totalPages) {
          this.pagina_atual = 1;
          this.carregarUsuarioPaginado(this.pagina_atual);
        }
        
      });
    } else if (this.nome === undefined || this.nome.trim() === "") {
      this.usuarioService.readAllUsersPage(pagina - 1).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;
      });
    }
  }
}