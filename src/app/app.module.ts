import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SysHttpInterceptor } from './intercepetor/http-interceptor';
import { SysService } from './service/sys.service';
import { UtilService } from './service/util.service';

import { DashboardComponent } from './pages/dashboard.component';
import { StaffComponent } from './pages/staff.component';
import { StaffService } from './service/module/staff.service';
import { LoginComponent } from './pages/login.component';
import { NotFoundComponent } from './pages/notfound.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,DashboardComponent,StaffComponent,LoginComponent,NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,NzDatePickerModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, 
    SysService, UtilService,StaffService,
    {provide: HTTP_INTERCEPTORS, useClass: SysHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
