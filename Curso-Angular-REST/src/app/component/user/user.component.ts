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
  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.usuarioService.getUserList().subscribe(data => {
      this.users = data;
      //console.log(this.users);
    });
  }

}
