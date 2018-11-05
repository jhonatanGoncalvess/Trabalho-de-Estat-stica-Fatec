import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  response: any;

  constructor(private utils: UtilsService) {
  }

  init(content) {
    this.response = JSON.parse(JSON.stringify(content));
    this.utils.orderBy(this.response.content);
    return this;
  }

  setPercent() {
    const total = this.utils.totalItems(this.response.content, 'qtd');
    this.response.content.forEach((el) => {
      el.percent = el.qtd / total;
    });
    return this;
  }

  setFrequencyAmass() {
    let acm = 0;
    this.response.content.forEach((el) => {
      acm += el.qtd;
      el.fac = acm;
    });
    return this;
  }

  setFrequencyPercent() {
    const total = this.utils.totalItems(this.response.content, 'qtd');
    let acm = 0;
    this.response.content.forEach((el) => {
      acm += el.qtd / total;
      el.facP = acm;
    });
    return this;
  }

  runAll() {
    this.setPercent()
      .setFrequencyAmass()
      .setFrequencyPercent();
    return this;
  }

  finish() {
    return this.response.content;
  }

}
