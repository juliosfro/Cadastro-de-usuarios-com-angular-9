import { ErrorDetails } from './../../../model/errorDetails';
import { UserChart } from './../../../model/userChart';
import { UsuarioService } from './../../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) { }

  userChart = new UserChart();
  errorDetails = new ErrorDetails();

  ngOnInit(): void {
    this.usuarioService.carregarGrafico().subscribe(data => {
      this.userChart = data;

      this.barChartLabels = this.userChart.nome.toUpperCase().replace(/"/g, "").split(',');
      const salario_array = JSON.parse('[' + this.userChart.salario + ']')

      this.barChartData = [
        { data: salario_array, label: 'Gráfico de Salário dos Usuários' }
      ];

    }, error => {
      const errors = JSON.parse(error);
      this.errorDetails.error = errors.message;
      this.errorDetails.code = errors.code;
      this.toastr.warning(this.errorDetails.error.toString());
    });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

}
