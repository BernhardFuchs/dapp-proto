import { TestBed } from '@angular/core/testing';

import { AddressInfoService } from './address-info.service';

describe('AddressInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressInfoService = TestBed.get(AddressInfoService);
    expect(service).toBeTruthy();
  });
});
