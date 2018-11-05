import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {UiElement} from '../../smn-ui/smn-ui.module';
import {Location} from '@angular/common';
import {DistribuicaoUniformeService} from './distribuicao-uniforme.service';

@Component({
  selector: 'app-distribuicao-uniforme',
  templateUrl: './distribuicao-uniforme.component.html',
  styleUrls: ['./distribuicao-uniforme.component.scss']
})
export class DistribuicaoUniformeComponent implements OnInit, AfterViewInit, OnDestroy {

  info: any;
  response: any;

  constructor(private element: ElementRef,
              public _location: Location,
              private uniformeService: DistribuicaoUniformeService) {
    this.info = {};
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }


  onSubmit(form, values) {
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

    this.response = this.uniformeService.calculate(values.intervaloA, values.intervaloB, values.menor, values.maior);
  }
}
