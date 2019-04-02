import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterCreationComponent } from './monster-creation.component';

describe('MonsterCreationComponent', () => {
  let component: MonsterCreationComponent;
  let fixture: ComponentFixture<MonsterCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonsterCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
