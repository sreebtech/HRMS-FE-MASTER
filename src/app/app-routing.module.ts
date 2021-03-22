import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {DepartmentsComponent} from './departments/departments.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { ClientsComponent } from './clients/clients.component';
import { TaskentryComponent } from './taskentry/taskentry.component';
import { TimesheetentryComponent } from './timesheetentry/timesheetentry.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
// import { HomeComponent } from './home/home.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { DatatableComponent } from './datatable/datatable.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { TaskphaseComponent } from './taskphase/taskphase.component';
import { RegisterComponent } from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {config} from 'rxjs';
const routes: Routes = [
  { path: '', component: HomeComponent },
 { path: 'app', component: AppComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'user', component: UsersComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'client', component: ClientsComponent},
  { path: 'task', component: TaskentryComponent},
  { path: 'timesheetentry', component: TimesheetentryComponent},
  { path: 'Reports', component: TimesheetComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'changePassword', component: ChangePasswordComponent},
  { path: 'Welcome', component: MenuComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'recover-password', component: RecoverPasswordComponent},
  { path: 'datatable', component: DatatableComponent},
  { path: 'holidays', component: HolidaysComponent},
  { path: 'Taskphase', component: TaskphaseComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{
      onSameUrlNavigation: 'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
