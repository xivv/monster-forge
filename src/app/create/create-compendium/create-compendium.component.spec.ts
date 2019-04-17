import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompendiumComponent } from './create-compendium.component';

describe('CreateCompendiumComponent', () => {
  let component: CreateCompendiumComponent;
  let fixture: ComponentFixture<CreateCompendiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompendiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
