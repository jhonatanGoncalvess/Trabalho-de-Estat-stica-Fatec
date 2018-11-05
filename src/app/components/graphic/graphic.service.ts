import {Injectable} from '@angular/core';

@Injectable()
export class GraphicService {

  info: Object;

  constructor() {
    this.info = {
      value: null,
      legend: null,
      column: null
    };
  }

}
