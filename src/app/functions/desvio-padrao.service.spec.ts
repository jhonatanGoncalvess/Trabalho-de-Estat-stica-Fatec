import { TestBed, inject } from '@angular/core/testing';

import { DesvioPadraoService } from './desvio-padrao.service';

describe('DesvioPadraoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesvioPadraoService]
    });
  });

  it('should be created', inject([DesvioPadraoService], (service: DesvioPadraoService) => {
    expect(service).toBeTruthy();
  }));
});
