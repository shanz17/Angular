/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeoLocationService } from './geo-location.service';

describe('Service: GeoLocation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoLocationService]
    });
  });

  it('should ...', inject([GeoLocationService], (service: GeoLocationService) => {
    expect(service).toBeTruthy();
  }));
});
