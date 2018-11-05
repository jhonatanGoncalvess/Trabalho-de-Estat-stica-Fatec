import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {GraphicService} from './graphic.service';

@Component({
  selector: 'smn-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicCollumnComponent implements OnInit, AfterViewInit {
  drawer = {
    rendered: false,
    padding: 16,
    maxValue: null, // PRECISA SER SETADO,
    elementsForItem: null, // PRECISA SER SETADO
    sizeCollum: null, // PRECISA SER SETADO
    sizeLabel: 32,
  };

  config: any;

  content: any;

  @Input('title') title;
  @Input('subtitle') subtitle;
  @Input('data') data;
  @Input('legend') legend;
  @Input('config') params;


  @ViewChild('menuInfo') menuInfo;

  constructor(private elementRef: ElementRef,
              private renderer2: Renderer2,
              private graphicService: GraphicService) {
    this.config = {};
  }

  ngOnInit() {
    this.setConfigs();
  }

  ngAfterViewInit() {
    this.generate(this.data);

    window.addEventListener('resize', () => {
      this.generate(this.data);
    });
    window.addEventListener('mousedown', () => {
      if (this.content.querySelector('.full-graphic__show-more')) {
        this.renderer2.removeChild(this.content, this.content.querySelector('.full-graphic__show-more'));
      }
      if (this.content.querySelector('.full-graphic__active')) {
        this.content.querySelector('.full-graphic__active').classList.remove('full-graphic__active');
      }
    });

  }

  generate(info) {
    // document.querySelector('.full-graphic').innerHTML = '';

    document.querySelector('.full-graphic') ?
      document.querySelector('.full-graphic').innerHTML = '' : null;

    this.setMaxValue(info);
    this.setNumberElementsForItem(info);

    this.content = this.elementRef.nativeElement.querySelector('svg');
    this.generateGraphics();
    this.generateLines();
    this.generateIndices(this.calculateIndices(this.drawer.maxValue), info);
    this.generateLabelX(info);

    this.createStyle(`.full-graphic__active { fill: ${this.config.colorSelected}; }`);

    this.createStyle(`.full-graphic__svg { overflow: hidden; }`);
    this.createStyle(`.full-graphic__svg--active { overflow: visible; }`);
    this.createStyle(`.full-graphic__svg__show-more { transform: scale(0); transition: All 180ms ease; }`);
    this.createStyle(`.full-graphic__svg__show-more--active { transform: scale(1); }`);
    this.createStyle(`.full-graphic__svg__show-more--inverse { transform-origin: top right; }`);

    info.forEach((item, index) => {
      this.generateCollum(item.value, index, this.config.colors);
    });
  }

  setConfigs() {
    if (this.params) {
      this.config.colorSelected = this.params.colorSelected ? this.params.colorSelected : '#999';
      this.config.lineWidth = this.params.lineWidth ? this.params.lineWidth : '1';
      this.config.lineColor = this.params.lineColor ? this.params.lineColor : '#CDCDCD';
      this.config.colors = this.params.colors ? this.params.colors : [];
      this.config.noSpace = this.params.noSpace ? 0 : 1;
    }
  }

  generateLines() {
    const height = this.content.querySelector('.full-graphic__graphic').height.baseVal.value;
    this.calculeSpaceWidth(this.data);

    this.calculateIndices(this.drawer.maxValue).forEach((num) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const lineAttributes = {
        'y1': this.calculatePosition(this.drawer.maxValue, height, this.drawer.maxValue - num),
        'y2': this.calculatePosition(this.drawer.maxValue, height, this.drawer.maxValue - num),
        'x1': '0',
        'x2': this.calculateWidthGraphic(),
        'stroke-width': this.config.lineWidth,
        'stroke-dasharray': '3 8',
        'stroke': this.config.lineColor
      };

      this.setAttribute(line, lineAttributes);
      this.renderer2.appendChild(this.content.querySelector('.full-graphic__graphic'), line);
    });
  }

  generateCollum(info, index, color?) {
    // Config<Object> | color<Array><string>
    const height = this.content.querySelector('.full-graphic__graphic').height.baseVal.value;
    const group = this.createElementNS('g');
    const svg = this.createElementNS('svg');

    this.setAttribute(svg, {'x': this.drawer.sizeCollum + (index * this.drawer.sizeCollum * (this.drawer.elementsForItem + this.config.noSpace))});
    this.renderer2.appendChild(group, svg);

    info.forEach((value, i) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const size = this.calculatePosition(this.drawer.maxValue, height, value);
      const attributes = {
        'x': this.drawer.sizeCollum > 0 ? (i * this.drawer.sizeCollum) : 0,
        'y': height - size,
        'height': size,
        'width': this.drawer.sizeCollum > 0 ? this.drawer.sizeCollum : 0,
        'fill': color[i] ? color[i] : '#CDCDCD'
      };
      this.setAttribute(rect, attributes);
      rect.addEventListener('click', (event) => {
        this.openMenu(event, value, i, index);
      });
      this.renderer2.appendChild(svg, rect);
    });
    this.renderer2.appendChild(this.content.querySelector('.full-graphic__graphic'), group);
  }

  calculatePosition(max, maxHeight, value) {
    return parseFloat(maxHeight) * parseFloat(value) / parseFloat(max);
  }

  calculeSpaceWidth(info) {
    this.drawer.sizeCollum = this.calculateWidthGraphic() / this.calculateQtdSpaces(info);
  }

  calculateQtdSpaces(info) {
    let acm = 0;
    info.forEach((item) => {
      acm += item.value.length + this.config.noSpace; // +1 === espaço entre as informações
    });

    const noSpace = this.config.noSpace ? 0 : 2;

    return acm + noSpace; // +1 === Espaço no começo do grafico
  }

  calculateIndices(max) {
    return [max, Math.round(max / 3) * 2, Math.round(max / 3), 0];
  }

  generateIndices(indices, info, config?) {
    const group = this.createElementNS('g');
    const svg = this.createElementNS('svg');
    this.renderer2.appendChild(group, svg);

    const height = this.content.clientHeight - this.drawer.padding - this.drawer.sizeLabel;

    svg.classList.add('full-graphic__label');
    const svgAttributes = {
      'x': '0',
      'y': this.drawer.padding,
      'width': this.drawer.sizeLabel > 0 ? this.drawer.sizeLabel : 0,
      'height': height > 0 ? height : 0
    };
    this.setAttribute(svg, svgAttributes);

    // CONFIGS
    const color = config && config.color ? config.color : '#000';

    // LABELS VERTICAIS
    indices.forEach((indice) => {
      const textV = this.createElementNS('text');
      const y = this.calculatePosition(
        this.drawer.maxValue,
        this.content.clientHeight - this.drawer.padding - this.drawer.sizeLabel,
        this.drawer.maxValue - indice
      );

      textV.textContent = indice;
      const textVAttributes = {
        'x': '50%',
        'y': y,
        'text-anchor': 'middle',
        'alignment-baseline': 'middle',
        'fill': color
      };
      this.setAttribute(textV, textVAttributes);
      textV.classList.add('full-graphic__label__text');
      this.renderer2.appendChild(svg, textV);
    });

    this.renderer2.appendChild(this.content, group);
  }

  generateLabelX(info) {
    const group = this.createElementNS('g');
    const svg = this.createElementNS('svg');
    this.renderer2.appendChild(group, svg);

    const svgAttributes = {
      'x': this.drawer.sizeLabel,
      'y': this.content.querySelector('.full-graphic__graphic').height.baseVal.value + this.drawer.padding,
      'width': this.calculateWidthGraphic() > 0 ? this.calculateWidthGraphic() : 0,
      'height': this.drawer.sizeLabel > 0 ? this.drawer.sizeLabel : 0
    };
    this.setAttribute(svg, svgAttributes);

    this.renderer2.appendChild(this.content, group);


    info.forEach((item, index) => {
      const pontoInicial = this.drawer.sizeCollum + (index * this.drawer.sizeCollum * (this.drawer.elementsForItem + this.config.noSpace ));
      const x = pontoInicial + (this.drawer.sizeCollum * this.drawer.elementsForItem / 2);

      const textH = this.createElementNS('text');
      textH.textContent = item.indice;
      const textHAttributes = {
        'x': x,
        'y': 16,
        'text-anchor': 'middle',
        'alignment-baseline': 'middle',
        'fill': '#000'
      };
      this.setAttribute(textH, textHAttributes);
      textH.classList.add('full-graphic__label__text');
      this.renderer2.appendChild(svg, textH);
    });

  }

  setMaxValue(info) {
    // VAMOS MAXIMO NA VERTICAL
    const numbers = [];
    info.forEach((item) => {
      item.value.forEach((value) => {
        numbers.push(value);
      });
    });
    this.drawer.maxValue = Math.max(...numbers);
  }

  generateGraphics() {
    const group = this.createElementNS('g');
    const svg = this.createElementNS('svg');
    this.renderer2.appendChild(group, svg);

    const height = this.content.clientHeight - this.drawer.padding - this.drawer.sizeLabel;
    const attributes = {
      'x': this.drawer.sizeLabel,
      'y': this.drawer.padding,
      'width': this.calculateWidthGraphic() > 0 ? this.calculateWidthGraphic() : 0,
      'height': height > 0 ? height : 0
    };

    this.setAttribute(svg, attributes);

    svg.classList.add('full-graphic__graphic');
    this.renderer2.appendChild(this.content, group);

  }

  calculateWidthGraphic() {
    const descontos = this.drawer.sizeLabel;
    return this.content.clientWidth - descontos;
  }

  setNumberElementsForItem(info) {
    this.drawer.elementsForItem = info[0].value.length;
  }

  setAttribute(el, attributes) {
    const keys = Object.keys(attributes);
    keys.forEach((key) => {
        el.setAttribute(key, attributes[key].toString());
    });
  }

  createElementNS(type) {
    return document.createElementNS('http://www.w3.org/2000/svg', type);
  }

  createStyle(code) {
    const style = document.createElement('style');
    style.innerHTML = code;
    this.renderer2.appendChild(this.content, style);
  }

  openMenu(event, value, indexLegenda, indexColumn) {
    event.target.classList.add('full-graphic__active');

    const legend = this.legend[indexLegenda];
    const column = this.data[indexColumn].indice;

    this.graphicService.info = {
      value: value,
      legend: legend,
      column: column
    };
    this.menuInfo.show(event);
  }

}
