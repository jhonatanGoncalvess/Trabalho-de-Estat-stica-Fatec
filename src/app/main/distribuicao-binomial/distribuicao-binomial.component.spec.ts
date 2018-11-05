import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuicaoBinomialComponent } from './distribuicao-binomial.component';

describe('DistribuicaoBinomialComponent', () => {
  let component: DistribuicaoBinomialComponent;
  let fixture: ComponentFixture<DistribuicaoBinomialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuicaoBinomialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuicaoBinomialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
