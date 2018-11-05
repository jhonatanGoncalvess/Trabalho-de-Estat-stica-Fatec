import { TestBed, inject } from '@angular/core/testing';

import { DistribuicaoNominalService } from './distribuicao-nominal.service';

describe('DistribuicaoNominalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistribuicaoNominalService]
    });
  });

  it('should be created', inject([DistribuicaoNominalService], (service: DistribuicaoNominalService) => {
    expect(service).toBeTruthy();
  }));
});
