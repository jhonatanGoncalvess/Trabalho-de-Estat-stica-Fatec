import { TestBed, inject } from '@angular/core/testing';

import { CoeficienteVariacaoService } from './coeficiente-variacao.service';

describe('CoeficienteVariacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoeficienteVariacaoService]
    });
  });

  it('should be created', inject([CoeficienteVariacaoService], (service: CoeficienteVariacaoService) => {
    expect(service).toBeTruthy();
  }));
});
