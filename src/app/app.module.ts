import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import { DepartmentsComponent } from './departments/departments.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { ClientsComponent } from './clients/clients.component';
import { TaskentryComponent } from './taskentry/taskentry.component';
import { TimesheetentryComponent } from './timesheetentry/timesheetentry.component';
import {BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
// import { ToastrModule } from 'ngx-toastr';
import { ToastrModule } from 'ng6-toastr-notifications';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { DatatableComponent } from './datatable/datatable.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { ChartModule } from 'primeng/chart';
import { DatePipe } from '@angular/common';
import { TaskphaseComponent } from './taskphase/taskphase.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule,MatButtonModule, MatFormFieldModule, MatRadioModule, MatSelectModule, MatToolbarModule,MatRippleModule,MatSliderModule} from "@angular/material";
  import { BnNgIdleService } from 'bn-ng-idle';
import { RegisterComponent } from './register/register.component';
import {MatStepperModule  } from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import { ParticlesModule } from 'angular-particle';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DepartmentsComponent,
    LoginComponent,
    ProjectComponent,
    ClientsComponent,
    TaskentryComponent,
    TimesheetentryComponent,
    DashboardComponent,
    TimesheetComponent,
    LogoutComponent,
    ChangePasswordComponent,
    HomeComponent,
    MenuComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    DatatableComponent,
    HolidaysComponent,
    TaskphaseComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [ChartModule,
    MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatFormFieldModule, MatRadioModule, MatSelectModule, MatToolbarModule,
        MatStepperModule,
        MatButtonModule,
        MatRippleModule,
        MatIconModule,
        MatSliderModule,
        MatSlideToggleModule,
        DragDropModule,
        ParticlesModule,
        ModalModule,
    BrowserModule,
    AppRoutingModule, BsDatepickerModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,  
    ScheduleModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()],
  providers: [{provide: APP_BASE_HREF, useValue: ''},DayService, DatePipe,
  WeekService, 
  WorkWeekService, 
  MonthService,
  AgendaService,
  MonthAgendaService,ToastrService,MessageService,BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
