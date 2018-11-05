import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {CorrelacaoRegressaoComponent} from './correlacao-regressao.component';
import {CorrelacaoRegressaoService} from './correlacao-regressao.service';
import { ResponseComponent } from './response/response.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    CorrelacaoRegressaoComponent,
    ResponseComponent
  ],
  providers: [
    CorrelacaoRegressaoService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CorrelacaoRegressaoModule { }
