import { TestBed, inject } from '@angular/core/testing';

import { DistribuicaoUniformeService } from './distribuicao-uniforme.service';

describe('DistribuicaoUniformeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistribuicaoUniformeService]
    });
  });

  it('should be created', inject([DistribuicaoUniformeService], (service: DistribuicaoUniformeService) => {
    expect(service).toBeTruthy();
  }));
});
