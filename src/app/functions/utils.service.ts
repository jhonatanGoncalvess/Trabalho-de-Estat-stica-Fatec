import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  totalItems(array, property) {
    let total = 0;
    array.forEach((obj) => {
      total += obj[property];
    });

    return total;
  }

  listingItens(content) {
    const arrayData = [];
    content.forEach((num, index) => {
      for (let i = 0; i < num.qtd; i++) {
        arrayData.push(num);
      }
    });
    return arrayData;
  }

  orderBy(el) {
    const response = el.sort((a, b) => {
      return (parseFloat(a.group) < parseFloat(b.group)) ? -1 : ((parseFloat(a.group) > parseFloat(b.group)) ? 1 : 0);
    });
    return response;
  }


  findClassForId(classes, id) {
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].class.id === id) {
        return classes[i];
      }
    }
  }
}
