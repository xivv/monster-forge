import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterListingComponent } from './monster-listing.component';

describe('MonsterListingComponent', () => {
  let component: MonsterListingComponent;
  let fixture: ComponentFixture<MonsterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
