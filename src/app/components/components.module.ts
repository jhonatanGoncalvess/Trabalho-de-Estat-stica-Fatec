import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { TableComponent } from './table/table.component';
import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [TableComponent],
  exports: [ TableComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
