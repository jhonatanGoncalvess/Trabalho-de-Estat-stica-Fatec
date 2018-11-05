import { TestBed, inject } from '@angular/core/testing';

import { DataGroupsService } from './data-groups.service';

describe('DataGroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataGroupsService]
    });
  });

  it('should be created', inject([DataGroupsService], (service: DataGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
