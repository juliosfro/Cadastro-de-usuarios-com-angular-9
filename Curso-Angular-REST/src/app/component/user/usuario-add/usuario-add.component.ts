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

  constructor(private route: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit(): void {
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
      });
    } else {
      this.userService.createUser(this.usuario).subscribe(data => {
        this.newUser();
      });
    }
  }

  newUser(): void {
    this.usuario = new User();
  }
}