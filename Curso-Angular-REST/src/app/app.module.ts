import { RouteGuardianGuard } from './service/route-guardian.guard';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* Usamos o modulo abaixo para fazer as requisicoes HTTP */
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './component/user/user.component';
import { UsuarioAddComponent } from './component/user/usuario-add/usuario-add.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';  

/* Criamos um array para armazenar nossas rotas. */
export const appRouters: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [RouteGuardianGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'users', component: UserComponent, canActivate: [RouteGuardianGuard] },
  { path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [RouteGuardianGuard] },
  { path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [RouteGuardianGuard] }
];

export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {};
/* Temos que exportar para poder funcionar */
export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
