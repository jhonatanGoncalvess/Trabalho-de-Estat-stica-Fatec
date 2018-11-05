import { Injectable } from '@angular/core';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class MedidasParatrizesService {

  constructor(private utilsService: UtilsService) { }

  comum(content, type, value) {
    const unitaryValue = 100 / type;
    const findValue = value * unitaryValue;
    const size = content[content.length - 1].fac;
    const pos = (findValue * size) / 100;
    return this.findGroup(pos, content).group;
  }

  findGroup(position, content) {
    for (let i = 0; i < content.length; i++) {
      if (position <= content[i].fac) {
        return content[i];
      }
    }
  }

  continua(content, type, value) {
    const unitaryValue = 100 / type;
    const findValue = value * unitaryValue;
    const size = content[content.length - 1].fac;
    const pos = (findValue * size) / 100;
    const group = this.findGroup(pos, content);
    const limiteInferior = group.class.min;
    const freqAAnt = this.utilsService.findClassForId(content, group.class.id - 1).fac;
    const qtd = group.qtd;
    const h = group.class.max - group.class.min;
    const middle = (pos - freqAAnt) / qtd;
    return limiteInferior + (middle * h);
  }
}
