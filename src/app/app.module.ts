import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { LoaderService } from './services/loader.service';
import { ToastService } from './services/toast.service';
import * as moment from 'moment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { environment } from '../environments/environment';
import { AlertMessageService } from './services/alert-message.service';
import { TitleService } from './services/title.service';
import { SidenavService } from './services/sidenav.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [

    // ui/browser services
    LoaderService,
    ToastService,
    TitleService,
    AlertMessageService,
    SidenavService,

    // app services
    UserService,

    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    moment.locale('en-us');

    if (environment.forceHttps && location.href.startsWith('http://'))
      location.href = location.href.replace('http://', 'https://');
  }
}
