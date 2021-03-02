import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardianGuard implements CanActivate {

  constructor(private userService: UsuarioService) {

  }

  /* Se retornar falso não vai deixar liberar a rota */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //console.info("Guardião sendo chamado");
    return this.userService.isUserAutenticated();
  }
}