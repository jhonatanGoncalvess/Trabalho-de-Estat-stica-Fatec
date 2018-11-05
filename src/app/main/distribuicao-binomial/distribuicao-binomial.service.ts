import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistribuicaoBinomialService {

  constructor() {
  }

  calculate(n, k, p, q, pelomenos, maximo) {
    return {
      probSucess: this.probSucess(p, q),
      probFracasso: this.probFracasso(p, q),
      fatorial: this.fatorial(n, k),
      probabilidadeTotal: this.probabilidadeTotal(n, k, p, q),
      fatorialp: this.fatorialP(n, pelomenos),
      pelomenos: this.pelomenos(pelomenos, n, p, q),
      fatorialm: this.fatorialM(n, maximo),
      maximo: this.maximo(maximo, n, p, q)
    };
  }

  probabilidadeTotal(n, k, p, q) {
    let probabilidade = (this.fatorial(n, k)) * (Math.pow(this.probSucess(p, q), k)) * (Math.pow(this.probFracasso(p, q), n - k));
    return probabilidade;
  }

  pelomenos(pelomenos, n, p, q) {
    let probP = 0;
    while (pelomenos <= n) {
      probP += (this.fatorialP(n, pelomenos)) * (Math.pow(this.probSucess(p, q), pelomenos)) * (Math.pow(this.probFracasso(p, q), n - pelomenos));
      pelomenos++;
    }
    return probP;
  }

  maximo(maximo, n, p, q) {
    let probM = 0;
    while (maximo >= 0) {
      probM += (this.fatorialP(n, maximo)) * (Math.pow(this.probSucess(p, q), maximo)) * (Math.pow(this.probFracasso(p, q), n - maximo));
      maximo--;

    }
    return probM;
  }

  // Fatoriais
  fatorialM(n, maximo) {
    let fatN = n;
    let fatK = maximo;
    let fatNK = (n - maximo);
    let fatorialNK = (n - maximo);

    if (n < 0 || maximo < 0 || fatNK < 0) {
      return -1;
    }

    else if (n == 0 || maximo == 0 || fatNK == 0) {
      return 1;
    }

    while (n-- > 2) {
      fatN *= n;
    }
    while (maximo-- > 2) {
      fatK *= maximo;
    }
    while (fatNK-- > 2) {
      fatorialNK *= fatNK;
    }

    return (fatN / (fatK * fatorialNK));
  }

  fatorialP(n, pelomenos) {
    let fatN = n;
    let fatK = pelomenos;
    let fatNK = (n - pelomenos);
    let fatorialNK = (n - pelomenos);

    if (n < 0 || pelomenos < 0 || fatNK < 0) {
      return -1;
    }

    else if (n == 0 || pelomenos == 0 || fatNK == 0) {
      return 1;
    }

    while (n-- > 2) {
      fatN *= n;
    }
    while (pelomenos-- > 2) {
      fatK *= pelomenos;
    }
    while (fatNK-- > 2) {
      fatorialNK *= fatNK;
    }

    return (fatN / (fatK * fatorialNK));
  }

  fatorial(n, k) {
    let fatN = n;
    let fatK = k;
    let fatNK = (n - k);
    let fatorialNK = (n - k);

    if (n < 0 || k < 0 || fatNK < 0) {
      return -1;
    }

    else if (n == 0 || k == 0 || fatNK == 0) {
      return 1;
    }

    while (n-- > 2) {
      fatN *= n;
    }
    while (k-- > 2) {
      fatK *= k;
    }
    while (fatNK-- > 2) {
      fatorialNK *= fatNK;
    }

    return (fatN / (fatK * fatorialNK));
  }

  // prob(n, k, p, q) {

  // }

  probSucess(p, q) {
    return (p / (p + q));
  }

  probFracasso(p, q) {
    return (q / (p + q));
  }


}
