import { Telefone } from 'src/app/model/telefone';
import { UsuarioService } from './../../../service/usuario.service';
import { User } from 'src/app/model/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  telefone = new Telefone();

  constructor(private route: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit(): void {
    document.getElementById('nome').focus();
    let id = this.route.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.readUserById(parseInt(id)).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  createUser(): void {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.userService.updateUser(this.usuario).subscribe(data => {
        this.newUser();
        document.getElementById('nome').focus();
      });
    } else {
      this.userService.createUser(this.usuario).subscribe(data => {
        this.newUser();
      });
      document.getElementById('nome').focus();
    }
  }

  deleteTelephone(id, index) {
    /* Se for um telefone novo que não tem id */
    if (id == null) {
      this.usuario.telefones.splice(index, 1);
      document.getElementById('telefone').focus();
      return;
    }

    if (id !== null && confirm("Deseja remover esse contato?")) {
      this.userService.deleteTelephoneById(id).subscribe(data => {
        /* Para remover o telefone da grid */
        this.usuario.telefones.splice(index, 1);
        //alert("Telefone removido. " + data);
        document.getElementById('telefone').focus();
      });
    }
  }

  addTelephone(): void {
    document.getElementById('telefone').focus();
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  newUser(): void {
    this.usuario = new User();
    this.telefone = new Telefone();
  }
}