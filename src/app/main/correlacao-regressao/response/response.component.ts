import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {CorrelacaoRegressaoService} from '../correlacao-regressao.service';
import {Location} from '@angular/common';
import {UiElement} from '../../../smn-ui/smn-ui.module';
import {Router} from '@angular/router';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit, AfterViewInit, OnDestroy {
  letters = [
    {id: 1, nome: 'X'},
    {id: 2, nome: 'Y'}
  ];

  calc: any;
  graphic: any;
  line: any;

  constructor(private element: ElementRef,
              public _location: Location,
              private correlacaoService: CorrelacaoRegressaoService,
              private router: Router) {
    this.calc = this.correlacaoService.calc;
    if (!this.calc.list || !this.calc.list.length) {
      this.router.navigate(['/correlacao-regressao']);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {


    this.generateChart();

  }

  ngOnDestroy() {
  }

  generateChart() {
    const canvas = <any>document.getElementById('graphic');
    const ctx = canvas.getContext('2d');

    this.generateLine();

    this.graphic = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Correlação',
            data: this.correlacaoService.calc.list,
            backgroundColor: 'black'
          },
          {
            type: 'line',
            label: 'line',
            data: this.line,
            showLine: true,
            backgroundColor: 'rgba(0,0,255,0)',
            pointBorderColor: 'rgba(0,0,255,0)',
            borderColor: 'rgba(0,0,255,.5)'
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            beginAtZero: true
          }],
          xAxes: [{
            beginAtZero: true
          }]
        }
      }
    });
  }

  generateLine() {
    let maior, menor;
    this.correlacaoService.calc.list.forEach((item, index) => {
      if (!index) {
        maior = menor = item;
      } else {
        if (item.x > maior.x) {
          maior = item;
        }

        if (item.x < menor.x) {
          menor = item;
        }
      }
    });
    this.line = [menor, maior];

  }

  onSubmit(form, type, value) {
    for (const control in form.controls) {
      if (form.controls.hasOwnProperty(control)) {
        form.controls[control].markAsTouched();
        form.controls[control].markAsDirty();
      }
    }
    if (!form.valid) {
      UiElement.focus(this.element.nativeElement.querySelector('form .ng-invalid'));
      return false;
    }

    if (type === 1) {
      this.calc.result = this.correlacaoService.regressao(this.correlacaoService.calc.A, this.correlacaoService.calc.B, value, null);
      this.correlacaoService.calc.list.push({x: this.calc.result, y: value});
      this.generateLine();
      this.graphic.data.datasets[1].data = this.line;
      this.graphic.update();
    } else {
      this.calc.result = this.correlacaoService.regressao(this.correlacaoService.calc.A, this.correlacaoService.calc.B, null, value);
      this.correlacaoService.calc.list.push({x: value, y: this.calc.result});
      this.generateLine();
      this.graphic.data.datasets[1].data = this.line;
      this.graphic.update();
    }

    form.reset();
    UiElement.focus(this.element.nativeElement.querySelector('#letter'));
  }

  focusValor() {
    UiElement.focus(this.element.nativeElement.querySelector('#value'));
  }

}
