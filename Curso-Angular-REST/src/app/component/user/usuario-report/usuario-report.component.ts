import { UserReport } from './../../../model/userReport';
import { User } from './../../../model/user';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true
};

@Component({
  selector: 'app-root',
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: []
})

export class UsuarioReportComponent {

  usuario = new User;
  userReport = new UserReport;

  constructor(private route: ActivatedRoute, private userService: UsuarioService) {}

  imprimeRelatorio() {
    //const dataInicio = new Date(this.userReport.dataInicio.toString());
    //const dataFim = new Date(this.userReport.dataFim.toString());
    //this.userReport.dataInicio = dataInicio.toLocaleString('pt-BR', { timeZone: 'UTC' });
    //this.userReport.dataFim = dataFim.toLocaleString('pt-BR', { timeZone: 'UTC' });
    this.userService.downloadPdfRelatorioParam(this.userReport);
  }

  limpaRelatorio() {
    document.querySelector('iframe').src = '';
  }
}