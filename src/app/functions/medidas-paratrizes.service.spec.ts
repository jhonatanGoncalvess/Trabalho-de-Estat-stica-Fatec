import { TestBed, inject } from '@angular/core/testing';

import { MedidasParatrizesService } from './medidas-paratrizes.service';

describe('MedidasParatrizesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedidasParatrizesService]
    });
  });

  it('should be created', inject([MedidasParatrizesService], (service: MedidasParatrizesService) => {
    expect(service).toBeTruthy();
  }));
});
