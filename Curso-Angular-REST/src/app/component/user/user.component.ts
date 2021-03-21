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
  size_array: Number[] = [5, 10, 15, 20];
  size: Number = this.size_array[0];

  constructor(private usuarioService: UsuarioService) { }

  // Configuração da ordenação
  key: string = 'id';
  reverse: boolean = true;
  sort(key) {
    if (this.key !== key) {
      this.key = key;
      this.reverse = true;
    } else if (this.key === key) {
      this.reverse = !this.reverse;
    }
    this.carregarUsuarioPaginado(this.pagina_atual);
  }

  ngOnInit(): void {
    /* No front-end a primeira página é a número 1 e no banco de dados é a numero 0 */
    this.carregarUsuarioPaginado(1);
    document.getElementById('nome').focus();

  }

  deleteUserById(id: Number, index: number) {
    document.getElementById('nome').focus();
    if (confirm('Deseja remover esse usuário?')) {
      this.usuarioService.deleteUserById(id).subscribe(data => {
        this.users.splice(index, 1);
      });
    }
  }

  readUserByName() {
    document.getElementById('nome').focus();
    if (this.nome === undefined || this.nome.trim() === "") {
      this.pagina_atual = 1;
      this.usuarioService.readAllUsersPageSort((this.pagina_atual - 1), this.reverse, this.key, this.size).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.carregarUsuarioPaginado(this.pagina_atual);
    }
  }

  carregarUsuarioPaginado(pagina: number): void {
    document.getElementById('nome').focus();
    if (this.nome !== undefined && this.nome.trim() !== "") {
      this.usuarioService.readUserByNamePageSort(this.nome, (pagina - 1), this.reverse, this.key, this.size).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;

        if (this.pagina_atual > data.totalPages) {
          this.pagina_atual = 1;
          this.carregarUsuarioPaginado(this.pagina_atual);
        }

      });
    } else if (this.nome === undefined || this.nome.trim() === "") {
      this.usuarioService.readAllUsersPageSort((this.pagina_atual - 1), this.reverse, this.key, this.size).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;
      });
    }
  }
}