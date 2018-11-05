import { TestBed, inject } from '@angular/core/testing';

import { TypeVariableService } from './type-variable.service';

describe('TypeVariableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeVariableService]
    });
  });

  it('should be created', inject([TypeVariableService], (service: TypeVariableService) => {
    expect(service).toBeTruthy();
  }));
});
