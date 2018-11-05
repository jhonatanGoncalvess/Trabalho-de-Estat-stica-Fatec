import {Injectable} from '@angular/core';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ModaService {

  constructor(private utilsService: UtilsService) {
  }

  comum(content) {
    let maior = 1;
    for (let i = 0; i < content.length; i++) {
      if (content[i].qtd > maior) {
        maior = content[i].qtd;
      }
    }
    const maiores = [];
    let acm;
    for (let i in content) {
      if (maior === content[i].qtd) {
        maiores.push(content[i].group);
        acm++;
      }
    }
    if (acm === content.length) {
      return 'Não há modal';
    }
    return maiores;
  }

  continua(groups) {
    const classeModal = [];

    let acm = 0;
    groups.forEach((group) => {
      acm = group.qtd > acm ? group.qtd : acm;
    });

    groups.forEach((group) => {
      if (group.qtd === acm) {
        classeModal.push(group);
      }
    });

    const modaConvencional = [];

    classeModal.forEach((modal) => {
      const value = ((modal.class.max - modal.class.min) / 2) + modal.class.min;
      modaConvencional.push(value);
    });

    return modaConvencional;
  }

  pearson(mediana, media) {
    return (3 * mediana) - (2 * media);
  }

  king(groups) {
    const classeModal = this.getClassModal(groups);
    const limiteInferior = classeModal.class.min;
    const amplitude = classeModal.class.max - classeModal.class.min;
    const fPost = this.utilsService.findClassForId(groups, classeModal.class.id + 1) ? this.utilsService.findClassForId(groups, classeModal.class.id + 1)['qtd'] : 0;
    const fAnt = this.utilsService.findClassForId(groups, classeModal.class.id - 1) ? this.utilsService.findClassForId(groups, classeModal.class.id - 1)['qtd'] : 0;
    return limiteInferior + (amplitude * (fPost / (fAnt + fPost)));
  }

  czuber(groups) {
    const classeModal = this.getClassModal(groups);
    const limiteInferior = classeModal.class.min;
    const amplitude = classeModal.class.max - classeModal.class.min;
    const fModal = classeModal.qtd;
    const fAnt = this.utilsService.findClassForId(groups, classeModal.class.id - 1) ? this.utilsService.findClassForId(groups, classeModal.class.id - 1)['qtd'] : 0;
    const fPost = this.utilsService.findClassForId(groups, classeModal.class.id + 1) ? this.utilsService.findClassForId(groups, classeModal.class.id + 1)['qtd'] : 0;
    return limiteInferior + (amplitude * ((fModal - fAnt) / ((2 * fModal) - (fAnt + fPost))));
  }

  getClassModal(groups) {
    let classeModal = null;
    let maxValue = 0;
    groups.forEach(item => {
      if (item.qtd > maxValue) {
        maxValue = item.qtd;
        classeModal = item;
      }
    });
    return classeModal;
  }
}
