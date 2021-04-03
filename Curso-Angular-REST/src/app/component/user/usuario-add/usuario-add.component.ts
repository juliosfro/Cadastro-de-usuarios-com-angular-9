import { Telefone } from 'src/app/model/telefone';
import { NgbDateAdapter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from './../../../service/usuario.service';
import { User } from 'src/app/model/user';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { setTheme } from 'ngx-bootstrap/utils';
import { Component, ViewChild } from '@angular/core';

const I18N_VALUES = {
  'pt-br': {// Provide labels in multiple languages
    weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], // Use whatever values you want in any language
    months: ['Janeiro', 'Fevereiro', 'Março',
      'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro',
      'Outubro', 'Novembro', 'Dezembro']// // Use whatever values you want in any language
  }
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
    // alert('toModel FormatDateAdapter!');
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
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
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
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
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    [{ provide: NgbDateParserFormatter, useClass: FormataData },
    { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
  ]
})

export class UsuarioAddComponent implements OnInit {

  @ViewChild('datePickerInput') datePicker: NgbInputDatepicker;

  minDate = { year: 1900, month: 1, day: 1 };
  maxDate = { year: 2030, month: 1, day: 1 };
  usuario = new User();
  telefone = new Telefone();

  constructor(private route: ActivatedRoute, private userService: UsuarioService) {
    setTheme('bs3');
  }

  ngOnInit(): void {
    document.getElementById('nome').focus();
    let id = this.route.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.readUserById(parseInt(id)).subscribe(data => {
        this.usuario = data;
        this.usuario.dataNascimento = new Date(this.usuario.dataNascimento).toLocaleDateString("pt-br");
      });
    }
  }

  setFocusTelephone() {
    document.getElementById('telefone').focus();
  }

  createUser(): void {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
     // alert(this.usuario.dataNascimento);
      this.userService.updateUser(this.usuario).subscribe(data => {
        this.newUser();
        // this.usuario.dataNascimento = null;
        document.getElementById('nome').focus();
      });
    } else {
      this.userService.createUser(this.usuario).subscribe(data => {
        this.newUser();
        // this.usuario.dataNascimento = null;
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