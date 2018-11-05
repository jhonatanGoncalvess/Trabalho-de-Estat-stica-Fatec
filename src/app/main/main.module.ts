import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { MainComponent } from './main.component';
import {StatisticsService} from "./statistics.service";
import {ComponentsModule} from "../components/components.module";
import {SharedModule} from "../shared.module";
import { DashboardModule } from './dashboard/dashboard.module';
import { DataInsertionModule } from './data-insertion/data-insertion.module';
import { DistribuicaoUniformeComponent } from './distribuicao-uniforme/distribuicao-uniforme.component';
import {CorrelacaoRegressaoModule} from './correlacao-regressao/correlacao-regressao.module';
import {DistribuicaoBinomialComponent} from './distribuicao-binomial/distribuicao-binomial.component';
import {DistribuicaoNominalModule} from './distribuicao-nominal/distribuicao-nominal.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    DashboardModule,
    DataInsertionModule,
    CorrelacaoRegressaoModule,
    DistribuicaoNominalModule
  ],
  declarations: [MainComponent, DistribuicaoUniformeComponent, DistribuicaoBinomialComponent, HomeComponent],
  exports: [ MainComponent ],
  providers: [ StatisticsService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MainModule { }
