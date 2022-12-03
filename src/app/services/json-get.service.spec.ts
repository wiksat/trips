import { TestBed } from '@angular/core/testing';

import { JsonGetService } from './json-get.service';

describe('JsonGetService', () => {
  let service: JsonGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
