import { TestBed, inject } from '@angular/core/testing';

import { ModaService } from './moda.service';

describe('ModaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModaService]
    });
  });

  it('should be created', inject([ModaService], (service: ModaService) => {
    expect(service).toBeTruthy();
  }));
});
