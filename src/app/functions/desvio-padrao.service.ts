import {Injectable} from '@angular/core';
import {MediaService} from './media.service';

@Injectable({
  providedIn: 'root'
})
export class DesvioPadraoService {

  response: any;

  constructor(private mediaService: MediaService) {
  }

  init(content) {
    this.response = JSON.parse(JSON.stringify(content));
    return this;
  }

  calculateNumerador() {
    return this.response.content.reduce((res, num) => {
      return res + (Math.pow(num.group - this.mediaService.ponderada(this.response.content), 2) * num.qtd);
    }, 0);
  }


  calculateDenominador() {
    return this.response.content.reduce((res, num) => {
      return res + num.qtd;
    }, 0);
  }

  calculate(numerador, denominador) {
    denominador = this.response.amostra ? denominador - 1 : denominador;
    return Math.sqrt(numerador / denominador);
  }

  finish() {
    return this.calculate(this.calculateNumerador(), this.calculateDenominador());
  }

}
