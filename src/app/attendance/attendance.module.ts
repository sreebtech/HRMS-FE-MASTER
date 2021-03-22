import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavesComponent } from './leaves/leaves.component';
import { RegularattendanceComponent } from './regularattendance/regularattendance.component';
import { LogoutrequistionComponent } from './logoutrequistion/logoutrequistion.component';



@NgModule({
  declarations: [LeavesComponent, RegularattendanceComponent, LogoutrequistionComponent],
  imports: [
    CommonModule
  ]
})
export class AttendanceModule { }
