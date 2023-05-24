import { TestBed } from '@angular/core/testing';

import { MusicListService } from './musiclist.service';

describe('MusiclistService', () => {
  let service: MusicListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
