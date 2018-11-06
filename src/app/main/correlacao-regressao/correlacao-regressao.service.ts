import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorrelacaoRegressaoService {

  calc: any;

  constructor() {
    this.calc = {};
  }

  calculate(values) {
    this.calc.list = values;

    const correlacao = this.correlacao(values.length,
      this.somatorioX(values),
      this.somatorioY(values),
      this.somatorioXY(values),
      this.somatorioX2(values),
      this.somatorioY2(values));

    const A = this.regressaoA(values.length,
      this.somatorioXY(values),
      this.somatorioX(values),
      this.somatorioY(values),
      this.somatorioY2(values));

    const B = this.regressaoB(values.length,
      this.somatorioX(values),
      this.somatorioY(values),
      A);

    this.calc.correlacao = correlacao;
    this.calc.nivel = this.nivelCorrelacao(correlacao);
    this.calc.A = A;
    this.calc.B = B;
  }

  somatorioX(values) {
    return values.reduce((acm, item) => {
      return acm + item.x;
    }, 0);
  }

  somatorioY(values) {
    return values.reduce((acm, item) => {
      return acm + item.y;
    }, 0);
  }

  somatorioXY(values) {
    return values.reduce((acm, item) => {
      return acm + item.x * item.y;
    }, 0);
  }

  somatorioX2(values) {
    return values.reduce((acm, item) => {
      return acm + Math.pow(item.x, 2);
    }, 0);
  }

  somatorioY2(values) {
    return values.reduce((acm, item) => {
      return acm + Math.pow(item.y, 2);
    }, 0);
  }

  correlacao(n, X, Y, XY, X2, Y2) {
    const numerador = (n * XY) - (X * Y);
    const denominador = Math.sqrt((n * X2 - Math.pow(X, 2)) * (n * Y2 - Math.pow(Y, 2)));
    return (numerador / denominador) * 100;
  }

  nivelCorrelacao(percent) {
    if (percent >= 0 && percent < 0.3) {
      return 'Inexistente a Muito fraca';
    } else if (percent >= 0.3 && percent < 0.6) {
      return 'Muita fraca a Média';
    } else {
      return 'Média a Forte';
    }
  }

  regressao(a, b, x, y) {
    return x ? a * x + b : (y - b) / a;
  }

  regressaoA(n, XY, X, Y, Y2) {
    const numerador = (n * XY) - (Y * X);
    const denominador = (n * Y2) - (Math.pow(Y, 2));
    return numerador / denominador;
  }

  regressaoB(n, X, Y, A) {
  
    const _X = Y / n;
    const _Y = X / n;
    return _Y - A * _X;
  }

}
