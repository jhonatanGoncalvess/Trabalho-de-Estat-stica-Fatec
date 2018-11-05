import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelacaoRegressaoComponent } from './correlacao-regressao.component';

describe('CorrelacaoRegressaoComponent', () => {
  let component: CorrelacaoRegressaoComponent;
  let fixture: ComponentFixture<CorrelacaoRegressaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelacaoRegressaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelacaoRegressaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
