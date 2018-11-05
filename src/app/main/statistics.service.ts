import {Injectable} from '@angular/core';
import {createOfflineCompileUrlResolver} from '@angular/compiler';
import {UtilsService} from '../functions/utils.service';
import {TableService} from '../functions/table.service';
import {DesvioPadraoService} from '../functions/desvio-padrao.service';
import {DataGroupsService} from '../functions/data-groups.service';

@Injectable()
export class StatisticsService {

  response: Object;

  constructor(private utils: UtilsService,
              private table: TableService,
              private desvioPadraoService: DesvioPadraoService,
              private dataGroups: DataGroupsService) {
    this.response = {};
  }

  /*
    0 - Quali nominal
    1 - Quali ordinal

    2 - Quanti discreta
    3 - Quanti continua
  */

  getDados() {
    return this.response;
  }

  set(object) {
    this.response = object;
  }
  get() {
    return this.response;
  }


}


