import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMonsterComponent } from './my-monster.component';

describe('MyMonsterComponent', () => {
  let component: MyMonsterComponent;
  let fixture: ComponentFixture<MyMonsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMonsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
