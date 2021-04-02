import { CustomDatepickerI18n, I18n } from './CustomDatepickerI18n';
import { NgbDatePTParserFormatter } from './NgbDatePTParserFormatter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouteGuardianGuard } from './service/route-guardian.guard';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { RouterModule, Routes } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
/* Usamos o modulo abaixo para fazer as requisicoes HTTP */
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './component/user/user.component';
import { UsuarioAddComponent } from './component/user/usuario-add/usuario-add.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

defineLocale('pt-br', ptBrLocale);

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
    OrderModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    TooltipModule.forRoot()
  ],
  providers: [BsLocaleService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
