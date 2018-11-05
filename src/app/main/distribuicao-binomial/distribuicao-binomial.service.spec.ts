import { TestBed, inject } from '@angular/core/testing';

import { DistribuicaoBinomialService } from './distribuicao-binomial.service';

describe('DistribuicaoBinomialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistribuicaoBinomialService]
    });
  });

  it('should be created', inject([DistribuicaoBinomialService], (service: DistribuicaoBinomialService) => {
    expect(service).toBeTruthy();
  }));
});
