import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataInsertionComponent } from './data-insertion.component';
import {SharedModule} from "../../shared.module";


@NgModule({
  imports: [
      SharedModule,
  ],
  declarations: [DataInsertionComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class DataInsertionModule { }
