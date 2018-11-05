import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {DistribuicaoNominalService} from './distribuicao-nominal.service';
import {UiElement} from '../../smn-ui/smn-ui.module';
import {Location} from '@angular/common';

@Component({
  selector: 'app-distribuicao-nominal',
  templateUrl: './distribuicao-nominal.component.html',
  styleUrls: ['./distribuicao-nominal.component.scss']
})
export class DistribuicaoNominalComponent implements AfterViewInit, OnDestroy {
  info: any;
  selectTypes = [
    {id: 1, nome: 'Menor que'},
    {id: 2, nome: 'Maior que'},
    {id: 3, nome: 'Intervalo'}
  ];

  constructor(private distribuicaoNominalService: DistribuicaoNominalService,
              private element: ElementRef,
              public _location: Location) {
    this.info = {};
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  onSubmit(form) {
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

    if (this.info.type === 1) {
      this.info.response = this.distribuicaoNominalService.calculate(this.info.menor, null, this.info.media, this.info.dv);
    } else if (this.info.type === 2) {
      this.info.response = this.distribuicaoNominalService.calculate(null, this.info.maior, this.info.media, this.info.dv);
    } else if (this.info.type === 3) {

      this.info.response = this.distribuicaoNominalService.calculate(this.info.menor, this.info.maior, this.info.media, this.info.dv);
    }
  }

}
