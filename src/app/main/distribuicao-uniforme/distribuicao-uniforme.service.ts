import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistribuicaoUniformeService {

  constructor() { }

  calculate(a, b, iA, iB) {
    return {
      media: this.media(a, b),
      DP: this.desvioPadrao(a, b),
      CV: this.CV(this.desvioPadrao(a, b), this.media(a, b)),
      probalidade: this.probalidade(a, b, iA - iB)
    };
  }

  media(a, b) {
    return (b + a) / 2;
  }

  desvioPadrao(a, b) {
    return Math.sqrt(Math.pow(b - a, 2) / 12);
  }

  CV(DP, media) {
    return (DP / media);
  }

  probalidade(a, b, valueInterval) {
    return -((1 / (a - b)) * valueInterval);
  }
}
