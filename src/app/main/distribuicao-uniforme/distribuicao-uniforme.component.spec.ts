import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuicaoUniformeComponent } from './distribuicao-uniforme.component';

describe('DistribuicaoUniformeComponent', () => {
  let component: DistribuicaoUniformeComponent;
  let fixture: ComponentFixture<DistribuicaoUniformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuicaoUniformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuicaoUniformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
