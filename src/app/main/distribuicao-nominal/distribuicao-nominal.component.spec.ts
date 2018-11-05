import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuicaoNominalComponent } from './distribuicao-nominal.component';

describe('DistribuicaoNominalComponent', () => {
  let component: DistribuicaoNominalComponent;
  let fixture: ComponentFixture<DistribuicaoNominalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuicaoNominalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuicaoNominalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
