import { TestBed } from '@angular/core/testing';

import { CompendiumService } from './compendium.service';

describe('CompendiumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompendiumService = TestBed.get(CompendiumService);
    expect(service).toBeTruthy();
  });
});
