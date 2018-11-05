import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {UiElement, UiSnackbar} from '../../smn-ui/smn-ui.module';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {CorrelacaoRegressaoService} from './correlacao-regressao.service';

@Component({
  selector: 'app-correlacao-regressao',
  templateUrl: './correlacao-regressao.component.html',
  styleUrls: ['./correlacao-regressao.component.scss']
})
export class CorrelacaoRegressaoComponent implements OnInit, AfterViewInit, OnDestroy {

  info: any;
  list: any;

  letters = [
    {id: 1, nome: 'X'},
    {id: 2, nome: 'Y'}
  ];

  calc: any;

  constructor(private element: ElementRef,
              public _location: Location,
              private correlacaoService: CorrelacaoRegressaoService,
              private router: Router) {
    this.info = {};
    this.calc = {};
    this.list = [];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
  }

  addInfo(form, info) {
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
    const inset = JSON.parse(JSON.stringify(info));;
    this.list.push(inset);
    form.reset();
    UiElement.focus(this.element.nativeElement.querySelector('#x'));
  }

  removeInfo(index) {
    this.list.splice(index, 1);
  }

  onSubmit(values) {
    this.correlacaoService.calculate(values);
    this.router.navigate(['/correlacao-regressao/response']);
  }

  openFile() {
    const button = <any>document.querySelector('.openfile');
    button.click();
  }

  readFile(event) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const lines = result.split('\n');
      const lineX = lines[0].replace(/"/g, '').replace(/,/g, '.').split(';');
      const lineY = lines[1].replace(/"/g, '').replace(/,/g, '.').split(';');

      if (lineX.length != lineY.length) {
        UiSnackbar.show({
          text: 'O tamanho dos dados é diferente'
        });
        return;
      }

      this.list = [];

      for (let i = 0; i < lineX.length; i++) {
        this.list.push({x: parseFloat(lineX[i]), y: parseFloat(lineY[i])});
      }

    };
    if (file) {
      reader.readAsText(file);
    }
  }

}
