import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class MedianaService {

  constructor(private utilsService: UtilsService) {
  }

  comum(content) {
    const somatorio = content[content.length - 1].fac;
    if (somatorio % 2 === 0) {
      const pos = [(somatorio / 2) - 1, (somatorio / 2)];
      const arrayData = [];
      content.forEach((num) => {
        for (let i = 0; i < num.qtd; i++) {
          arrayData.push(num.group);
        }
      });
      return (parseFloat(arrayData[pos[0]]) + parseFloat(arrayData[pos[1]])) / 2;
    } else {
      const arrayData = [];
      content.forEach((num) => {
        for (let i = 0; i < num.qtd; i++) {
          arrayData.push(num);
        }
      });
      return arrayData[(arrayData.length + 1) / 2].group;
    }
  }

  continua(groups, interval) {
    const somatorio = groups[groups.length - 1].fac;
    const arrayData = this.utilsService.listingItens(groups);


    if (somatorio % 2 === 0) {
      const res = [];
      const pos = [somatorio / 2, somatorio / 2 + 1];
      pos.forEach((position) => {
        const limiteInferior = arrayData[position].class.min;
        const freqAA = groups[arrayData[position].class.id - 2] ? groups[arrayData[position].class.id - 2].fac : 0;
        const freq = groups[arrayData[position].class.id - 1].qtd;
        const pre = ((parseFloat(somatorio) / 2) - parseFloat(freqAA)) / parseFloat(freq);
        res.push(limiteInferior + (pre * interval));
      });
      return (res[0] + res[1]) / 2;
    } else {
      const pos = (somatorio + 1) / 2;
      const limiteInferior = arrayData[pos].class.min;
      const freqAA = groups[arrayData[pos].class.id - 2] ? groups[arrayData[pos].class.id - 2].fac : 0;
      const freq = groups[arrayData[pos].class.id - 1].qtd;
      const pre = ((parseFloat(somatorio) / 2) - parseFloat(freqAA)) / parseFloat(freq);

      return limiteInferior + (pre * interval);
    }
  }
}
