import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {GraphicCollumnComponent} from './graphic.component';
import {SharedModule} from '../../shared.module';
import {GraphicService} from './graphic.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    GraphicCollumnComponent
  ],
  providers: [
    GraphicService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    GraphicCollumnComponent
  ]
})
export class GraphicCollumnModule { }
