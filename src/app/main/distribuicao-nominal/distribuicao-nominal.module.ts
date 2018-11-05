import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DistribuicaoNominalComponent} from './distribuicao-nominal.component';
import {DistribuicaoNominalService} from './distribuicao-nominal.service';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [DistribuicaoNominalComponent],
  providers: [DistribuicaoNominalService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DistribuicaoNominalModule {
}
