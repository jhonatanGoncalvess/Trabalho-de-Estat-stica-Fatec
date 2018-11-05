import { DistribuicaoNominalModule } from './distribuicao-nominal.module';

describe('DistribuicaoNominalModule', () => {
  let distribuicaoNominalModule: DistribuicaoNominalModule;

  beforeEach(() => {
    distribuicaoNominalModule = new DistribuicaoNominalModule();
  });

  it('should create an instance', () => {
    expect(distribuicaoNominalModule).toBeTruthy();
  });
});
