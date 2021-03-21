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
    this.key = (this.key !== key) ? key : this.key;
    this.reverse = (this.key !== key) ? true : !this.reverse;
    this.carregarUsuarioPaginado(this.pagina_atual);
  }

  ngOnInit(): void {
    /* No front-end a primeira página é a número 1 e no banco de dados é a numero 0 */
    this.carregarUsuarioPaginado(1);
    document.getElementById('nome').focus();
  }

  deleteUserById(id: Number, index: number) {
    document.getElementById('nome').focus();
    (confirm('Deseja remover esse usuário?')) ?
      this.usuarioService.deleteUserById(id).subscribe(data => {
        this.users.splice(index, 1);
      }) : null;
  }

  readUserByNamePageSort(pagina: number): void {
    this.pagina_atual = pagina;
    this.usuarioService.readUserByNamePageSort(this.nome, (this.pagina_atual - 1), this.reverse, this.key, this.size).subscribe(data => {

      this.users = data.content;
      this.total = data.totalElements;

      (this.pagina_atual > data.totalPages && this.pagina_atual !== 1)
        ? this.readUserByNamePageSort(1) : null;
    });
  }

  readAllUsersPageSort(pagina: number): void {
    this.pagina_atual = pagina;
    this.usuarioService.readAllUsersPageSort(this.pagina_atual - 1, this.reverse, this.key, this.size).subscribe(data => {
      this.users = data.content;
      this.total = data.totalElements;

      (this.pagina_atual > data.totalPages && this.pagina_atual !== 1)
        ? this.readAllUsersPageSort(1) : null;
    });
  }

  carregarUsuarioPaginado(pagina: number): void {
    document.getElementById('nome').focus();
    (this.nome !== undefined && this.nome.trim() !== "") ?
      this.readUserByNamePageSort(pagina) : this.readAllUsersPageSort(this.pagina_atual);
  }
}