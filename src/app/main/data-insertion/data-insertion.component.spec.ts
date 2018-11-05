import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInsertionComponent } from './data-insertion.component';

describe('DataInsertionComponent', () => {
  let component: DataInsertionComponent;
  let fixture: ComponentFixture<DataInsertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInsertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
