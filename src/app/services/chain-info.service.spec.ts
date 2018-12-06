import { TestBed } from '@angular/core/testing';

import { ChainInfoService } from './chain-info.service';

describe('ChainInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChainInfoService = TestBed.get(ChainInfoService);
    expect(service).toBeTruthy();
  });
});
