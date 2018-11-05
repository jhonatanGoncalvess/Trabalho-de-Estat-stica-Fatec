import { TestBed, inject } from '@angular/core/testing';

import { CorrelacaoRegressaoService } from './correlacao-regressao.service';

describe('CorrelacaoRegressaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorrelacaoRegressaoService]
    });
  });

  it('should be created', inject([CorrelacaoRegressaoService], (service: CorrelacaoRegressaoService) => {
    expect(service).toBeTruthy();
  }));
});
