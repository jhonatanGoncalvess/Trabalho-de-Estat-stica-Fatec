import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SMNUIModule, UiSnackbar, UiToolbarService} from './smn-ui/smn-ui.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [],
  exports: [
    FormsModule,
    BrowserModule,
    SMNUIModule,
    HttpModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [UiToolbarService],
  bootstrap: []
})
export class SharedModule {
}
