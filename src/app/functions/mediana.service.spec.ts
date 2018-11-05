import { TestBed, inject } from '@angular/core/testing';

import { MedianaService } from './mediana.service';

describe('MedianaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedianaService]
    });
  });

  it('should be created', inject([MedianaService], (service: MedianaService) => {
    expect(service).toBeTruthy();
  }));
});
