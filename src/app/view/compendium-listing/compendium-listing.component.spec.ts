import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompendiumListingComponent } from './compendium-listing.component';

describe('CompendiumListingComponent', () => {
  let component: CompendiumListingComponent;
  let fixture: ComponentFixture<CompendiumListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompendiumListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompendiumListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
