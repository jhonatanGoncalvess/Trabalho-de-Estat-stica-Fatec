import {Injectable} from '@angular/core';
import {TableService} from './table.service';
import {StatisticsService} from '../main/statistics.service';
import {DesvioPadraoService} from './desvio-padrao.service';
import {ModaService} from './moda.service';
import {MediaService} from './media.service';
import {MedianaService} from './mediana.service';
import {DataGroupsService} from './data-groups.service';
import {MedidasParatrizesService} from './medidas-paratrizes.service';
import {CoeficienteVariacaoService} from './coeficiente-variacao.service';

@Injectable({
  providedIn: 'root'
})
export class TypeVariableService {

  MAX_VALUE_FOR_DISCRETA = 10;
  type: number;
  response: any;

  constructor(
    private statisticsService: StatisticsService,
    private tableService: TableService,
    private desvioPadraoService: DesvioPadraoService,
    private modaService: ModaService,
    private mediaService: MediaService,
    private medianaService: MedianaService,
    private dataGroupsService: DataGroupsService,
    private medidasSeparatrizesService: MedidasParatrizesService,
    private coeficienteVariacaoService: CoeficienteVariacaoService) {
  }

  /*
    2 | Continua
    1 | Discreta
    0 | Quali
   */
  identify(content, ordinal?) {
    let isQuantitativa = null;
    let error;

    content.forEach((dado) => {
      if (isQuantitativa === null) {
        isQuantitativa = !isNaN(dado.group);
      } else {
        if (isQuantitativa !== !isNaN(dado.group)) {
          error = true;
        }
      }
    });

    if (error) {
      console.error('Não conseguimos identificar se a variavel é quanti ou quali');
      return this;
    }

    if (isQuantitativa) {
      const res = content.length > this.MAX_VALUE_FOR_DISCRETA ? 2 : 1;
      this.type = res;
      return this;
    } else {
      this.type = 0;
      return this;
    }
  }

  callFunction() {
    switch (this.type) {
      case 0:
        this.qualitativa();
        break;
      case 1:
        this.discreta();
        break;
      case 2:
        this.continua();
        break;
      default:
        console.error('Tipo invalido');
        this.response = null;
    }
    return this;
  }

  qualitativa() {
    const content = this.tableService.init(this.response)
      .runAll()
      .finish();

    const response = {
      title: this.response.title,
      content: content,
      type: this.type
    };
    this.response = response;
    return this;
  }

  discreta() {
    const content = this.tableService.init(this.response)
      .runAll()
      .finish();

    const DPR = this.desvioPadraoService.init(this.response).finish();
    const moda = this.modaService.comum(content);
    const media = this.mediaService.ponderada(content);
    const mediana = this.medianaService.comum(content);
    const coeficienteVariacao = this.coeficienteVariacaoService.calculate(DPR, media);
    let medidaSeparatriz = null;
    if (this.response.medidaSeparatriz && this.response.valueMedidaSeparatriz) {
      medidaSeparatriz = this.medidasSeparatrizesService.comum(
        content,
        this.response.medidaSeparatriz,
        this.response.valueMedidaSeparatriz);
    }

    const response = {
      title: this.response.title,
      content: content,
      DPR: DPR,
      moda: moda,
      media: media,
      mediana: mediana,
      medidaSeparatriz: medidaSeparatriz,
      coeficienteVariacao: coeficienteVariacao,
      type: this.type
    };
    this.response = response;
    return this;

  }

  continua() {
    const content = this.tableService.init(this.response)
      .runAll()
      .finish();

    const DPR = this.desvioPadraoService.init(this.response).finish();
    const groups = this.dataGroupsService.init(content).runAll().finish();
    const media = this.mediaService.continua(groups);
    const moda = this.modaService.continua(groups);
    const mediana = this.medianaService.continua(groups, this.dataGroupsService.intervalClass);
    const pearson = this.modaService.pearson(mediana, media);
    const king = this.modaService.king(groups);
    const czuber = this.modaService.czuber(groups);
    let medidaSeparatriz = null;
    const coeficienteVariacao = this.coeficienteVariacaoService.calculate(DPR, media);
    if (this.response.medidaSeparatriz && this.response.valueMedidaSeparatriz) {
      medidaSeparatriz = this.medidasSeparatrizesService.continua(
        groups,
        this.response.medidaSeparatriz,
        this.response.valueMedidaSeparatriz);
    }

    const response = {
      title: this.response.title,
      content: groups,
      DPR: DPR,
      media: media,
      mediana: mediana,
      medidaSeparatriz: medidaSeparatriz,
      moda: [
        {title: 'comum', value: moda},
        {title: 'pearson', value: pearson},
        {title: 'king', value: king},
        {title: 'czuber', value: czuber},
      ],
      coeficienteVariacao: coeficienteVariacao,
      type: this.type
    };
    this.response = response;
    return this;
  }

  setInService() {
    this.statisticsService.set(this.response);

  }

  run(info) {
    this.response = JSON.parse(JSON.stringify(info));

    if (this.response.tipoDeVariavel === 2) {
      this.type = 0;
      this.callFunction()
        .setInService();
    } else if (this.response.tipoDeVariavel === 3) {
      this.type = 1;
      this.callFunction()
        .setInService();
    } else if (this.response.tipoDeVariavel === 4) {
      this.type = 2;
      this.callFunction()
        .setInService();
    } else {
      this.identify(this.response.content)
        .callFunction()
        .setInService();
    }
  }

}
