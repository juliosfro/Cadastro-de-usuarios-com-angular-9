import { UserReport } from './../../../model/userReport';
import { User } from './../../../model/user';
import { NgbDateAdapter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../service/usuario.service';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { setTheme } from 'ngx-bootstrap/utils';
import { Component, ViewChild } from '@angular/core';

const I18N_VALUES = {
  'pt-br': {
    weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    months: ['Janeiro', 'Fevereiro', 'Março',
      'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro',
      'Outubro', 'Novembro', 'Dezembro']
  }
};

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

@Injectable()
export class I18n {
  language = 'pt-br';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

export class DetailsCalendarComponent {
  constructor(public i18n: NgbDatepickerI18n) { }

}

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';
  formataData: FormataData;

  fromModel(value: string | null): NgbDateStruct | null {
    if (value !== null) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? this.formataData.validateDayAndMonth(date.day.toString()) + this.DELIMITER + this.formataData.validateDayAndMonth(date.month.toString()) + this.DELIMITER + date.year : null;
  }

}

@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value !== null) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct): string | null {
    return date ? this.validateDayAndMonth(date.day.toString()) + this.DELIMITER + this.validateDayAndMonth(date.month.toString()) + this.DELIMITER + date.year : null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    // alert('toModel FormataData!');
    return date ? this.validateDayAndMonth(date.day.toString()) + this.DELIMITER + this.validateDayAndMonth(date.month.toString()) + this.DELIMITER + date.year : null;
  }

  validateDayAndMonth(value: string): string {
    if (value !== "" && parseInt(value) <= 9) {
      return '0' + value;
    }
    return value;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: [
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    [{ provide: NgbDateParserFormatter, useClass: FormataData },
    { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
  ]
})

export class UsuarioReportComponent {

  usuario = new User;
  userReport = new UserReport;

  @ViewChild('datePickerInput') datePicker: NgbInputDatepicker;

  minDate = { year: 1900, month: 1, day: 1 };
  maxDate = { year: 2030, month: 1, day: 1 };

  constructor(private route: ActivatedRoute, private userService: UsuarioService) {
    setTheme('bs3');
  }

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