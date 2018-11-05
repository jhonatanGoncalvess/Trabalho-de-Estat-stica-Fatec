import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGroupsService {

  response: any;

  NUM_CLASS = 0;

  amplitude: number;
  classe: number;
  intervalClass: number;
  groupValues: any[] = [];

  constructor() {
  }

  init(content) {
    this.resetService();
    this.response = JSON.parse(JSON.stringify(content));
    return this;
  }

  resetService() {
    this.response = {};
    this.NUM_CLASS = 0;
    this.amplitude = null;
    this.classe = null;
    this.intervalClass = 0;
    this.groupValues = [];
  }

  orderBy() {
    this.response.sort((a, b) => {
      return (parseFloat(a.group) < parseFloat(b.group)) ? -1 : ((parseFloat(a.group) > parseFloat(b.group)) ? 1 : 0);
    });
    return this;
  }

  getAmplitude() {
    const lastItem = this.response[this.response.length - 1].group;
    const firstItem = this.response[0].group;
    this.amplitude = (lastItem - firstItem) + 1; // POR QUE?
    return this;
  }

  getClassNumber() {
    const K = Math.trunc(Math.sqrt(this.response.length));
    const classes = [K - 1, K, K + 1];
    this.classe = classes[this.NUM_CLASS];
    return this;
  }

  getIntervalClass() {
    let checker;
    do {
      if (Number.isInteger(this.amplitude / this.classe)) {
        this.intervalClass = this.amplitude / this.classe;
        checker = true;
      } else {
        this.amplitude++;
      }
    } while (!checker);
    return this;
  }

  defineLimits() {
    let lastValue = parseFloat(this.response[0].group);
    for (let i = 1; i <= this.classe; i++) {
      this.groupValues.push({
        id: i,
        min: lastValue,
        max: lastValue + this.intervalClass
      });

      lastValue = lastValue + this.intervalClass;
    }
    return this;
  }

  setLimitsInObjects() {
    this.response.forEach((obj) => {
      this.groupValues.forEach((group) => {
        if (obj.group >= group.min && obj.group < group.max) {
          obj.class = group;
        }
      });
    });

    return this;
  }

  generateGroups() {
    const res = [];

    this.groupValues.forEach((group) => {
      let temp = [];
      let qtdELementos = 0;

      this.response.forEach((obj) => {
        qtdELementos += obj.qtd;
        if (group.id === obj.class.id) {
          temp.push(obj);
        }
      });

      // CASO NÂO TENHA NENHUM ELEMENTO NO GRUPO
      if (!temp.length) {
        temp = [{group: {id: group.id, qtd: 0, percent: 0}}];
      }

      const soma = {
        fac: 0, facP: 0, percent: 0,
        qtd: 0, group: '', class: {min: 0, max: 0, id: 0}
      };

      temp.forEach((obje, index) => {
        soma.fac = 1;
        soma.facP = 1;
        soma.percent += obje.percent || 0;
        soma.qtd += obje.qtd || 0;
        soma.group = `${group.min} |-- ${group.max}`;
        soma.class = {
          min: group.min,
          max: group.max,
          id: group.id
        };

        const anterior = res[res.length - 1];

        if (anterior) {
          soma.fac = anterior['fac'] + soma.qtd;
        } else {
          soma.fac = soma.qtd;
        }
        soma.facP = ((100 * soma.fac) / qtdELementos) / 100;
      });

      res.push(soma);
    });

    this.response = res;
    return this;
  }

  runAll() {
    this.orderBy()
      .getAmplitude()
      .getClassNumber()
      .getIntervalClass()
      .defineLimits()
      .setLimitsInObjects()
      .generateGroups();
    return this;
  }

  finish() {
    return this.response;
  }


}
