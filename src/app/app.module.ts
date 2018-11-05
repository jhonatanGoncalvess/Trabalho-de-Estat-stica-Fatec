import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared.module';

import { AppComponent } from './app.component';
import {MainModule} from "./main/main.module";
import {AppRoutingModule} from "./app-routing.module";
import {ComponentsModule} from "./components/components.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    MainModule,
    ComponentsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
