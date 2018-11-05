import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoeficienteVariacaoService {

  constructor() { }

  calculate(DV, media) {
    return (DV / media) * 100;
  }
}
