import { Component, OnInit } from '@angular/core'; 
import { BsDatepickerConfig } from 'ngx-bootstrap'; 
import { TimeSheetService } from '../services/timesheet.services'; 
import { timeSheet } from '../models/timeSheet'; 
import { analyzeAndValidateNgModules } from '@angular/compiler'; 
import { ToastrManager } from 'ng6-toastr-notifications'; 
import { ViewChild } from '@angular/core'; 
import { MatSort, MatTableDataSource } from '@angular/material'; 
import { MatPaginator } from '@angular/material/paginator'; 
 
import { TableUtil } from '../tableUtil'; 
import {task} from '../models/task'; 
@Component({ 
  selector: 'app-root', 
  templateUrl: './timesheetentry.component.html', 
  styleUrls: ['./timesheetentry.component.css'] 
}) 
export class TimesheetentryComponent implements OnInit { 
  maxDate = new Date(); 
  userSession: any; 
  colorTheme = 'theme-dark-blue'; 
  user: any; 
  data : any; 
  projectDetails:any; 
  taskDetails: any 
  date: Date 
  yearStart: any 
  weekNo: any; 
  dateFormat: any 
  finalDate: Date; 
  maxDayDate = new Date(); 
  dataSourceAdd; 
  newdate: Date 
  newdate6: any; 
  showDate: Date; 
  taskAddObj:task 
  day1Hrs: any; 
  prcntg: any; 
  autid: any; 
  getDataTimeSheet: any 
  timeSheetAddObj: timeSheet; 
  sheetDetails: any; 
  validateDate: any; 
  cnvrtDate: any; 
  arr_list: any; 
  teamDetails: any; 
  empId: any; 
  allReportsByEmpId: any 
  @ViewChild("tsfrm", { static: true }) form: any; 
  dataSource; 
  @ViewChild(MatSort, { static: true }) sort: MatSort; 
  @ViewChild("paginator", { static: true }) paginator: MatPaginator; 
  @ViewChild("paginator1", { static: true }) paginator1: MatPaginator; 
  displayedColumns = ['clientName-projectName', 'taskphase-description', 'workedDate|date', 'hours', 'percentage', 'status'] 
  displayedColumnsAdd = ['projectname', 'taskphase-description', 'startDate|date', 'endDate|date', 'taskTime', 'hours', 'day1Hrs', 'prcntg', 'Action'] 
 
  ReportsdataById: any 
  bsConfig: Partial<BsDatepickerConfig>; 
  constructor(private ts: TimeSheetService, public toastr: ToastrManager) { 
    this.timeSheetAddObj = new timeSheet() 
 
    this.ts.Getautoincrement().subscribe((data) => { 
      this.data = data[0]; 
      this.autid = this.data.AUTO_INCREMENT; 
    }); 
    this.autid= this.autid; 
  } 
  applyFilter(filterValue: string) { 
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue; 
  } 
 
 
  sendWeeklyReportForApproval() { 
    console.log(this.newdate6) 
    this.ts.sendWeeklyReportToManager(this.newdate, this.newdate6, this.user[0].id).subscribe((data) => { 
      this.toastr.successToastr("Time Sheet Submitted SuccessFully"); 
 
    } 
    ) 
  } 
// selfe entered task for time sheet
  addTimeSheetself(pid: any, tid: any, day1: any, prcntg: any) { 
    console.log("tid",this.taskAddObj.description)
    if(tid == 'tid'){ 
 
      this.ts.Getautoincrement().subscribe((data) => { 
        this.data = data[0]; 
        this.autid = this.data.AUTO_INCREMENT+1; 
 
      }); 
    } 
    //save the task in task table 
    if(this.taskAddObj.projectId == undefined && this.taskAddObj.description== undefined) {

       this.toastr.errorToastr("Please select the project and enter the task", 'Error'); 
    }
    else if(this.taskAddObj.projectId == undefined) {

      this.toastr.errorToastr("Please select the project", 'Error'); 
   }
   else if(this.taskAddObj.description== undefined) {

    this.toastr.errorToastr("Please enter the task", 'Error'); 
 }
 else{
    if (day1.value > 0 && day1.value < 25 && prcntg.value < 101 && prcntg.value > 0) { 
      if(this.taskAddObj.projectId == 13 && this.taskAddObj.description!= undefined) { 
        this.taskAddObj.clientId = 2; 
        this.taskAddObj.taskPhaseId = 19; 
        this.ts.SaveTask(this.taskAddObj).subscribe((data) => { 
   
        }); 
      } 
      this.timeSheetAddObj.assignedTo = this.user[0].id 
      this.timeSheetAddObj.projectId = pid;  
      if (tid == 'tid'){ 
        this.timeSheetAddObj.taskId = this.autid; 
      }else { 
        this.timeSheetAddObj.taskId = tid; 
      }  
      this.showDate = (this.date) 
      this.timeSheetAddObj.workedDate = this.showDate 
      // console.log(this.timeSheetAddObj.projectId, this.timeSheetAddObj.taskId, this.timeSheetAddObj.workedDate, this.timeSheetAddObj.assignedTo) 
      this.ts.verifyTimeSheet(this.timeSheetAddObj.projectId, this.timeSheetAddObj.taskId, this.timeSheetAddObj.workedDate, this.timeSheetAddObj.assignedTo).subscribe((dataResult) => { 
         
        if (dataResult.length > 0) { 
          if (dataResult[0].status == "Approved") { 
            this.toastr.errorToastr("Your timesheet has been approved already", 'Error'); 
          } 
          else { 
            this.showDate = (this.date) 
            this.timeSheetAddObj.workedDate = this.showDate 
            this.timeSheetAddObj.hours = day1.value 
            this.timeSheetAddObj.percentage = prcntg.value 
            this.ts.updateTimeSheet(this.timeSheetAddObj).subscribe((data) => { 
              this.form.reset(); 
              this.getAllTimeSheetByEmpID() 
              this.getTaskById(); 
              this.toastr.infoToastr(data.message, 'Updated'); 
 
            }) 
          } 
        } 
 
        else { 
          this.timeSheetAddObj.hours = day1.value 
          this.timeSheetAddObj.percentage = prcntg.value 
 
          this.showDate = (this.date) 
          this.timeSheetAddObj.workedDate = this.showDate 
          // console.log(this.timeSheetAddObj) 
          this.ts.addTimeSheet(this.timeSheetAddObj).subscribe((data) => { 
            // console.log(data.message) 
            this.form.reset(); 
            this.getAllTimeSheetByEmpID() 
            this.getTaskById(); 
 
            this.toastr.successToastr(data.message); 
 
          }) 
        } 
      }); 
    } 
    else { 
      this.toastr.errorToastr("Once check the time entry(0-24) and percentage entry with in the limits(0-100)"); 
 
    } }
  } 
 
  addTimeSheet(pid: any, tid: any, day1: any, prcntg: any) { 
//     console.log("tid",this.taskAddObj.description)
//     if(tid == 'tid'){ 
 
//       this.ts.Getautoincrement().subscribe((data) => { 
//         this.data = data[0]; 
//         this.autid = this.data.AUTO_INCREMENT+1; 
 
//       }); 
//     } 
//     //save the task in task table 
//     if(this.taskAddObj.projectId == 13 && this.taskAddObj.description== undefined) {

//        this.toastr.errorToastr("Please enteer the task", 'Error'); 
//     }
//  else{
    if (day1.value > 0 && day1.value < 25 && prcntg.value < 101 && prcntg.value > 0) { 
      // if(this.taskAddObj.projectId == 13 && this.taskAddObj.description!= undefined) { 
      //   this.taskAddObj.clientId = 2; 
      //   this.taskAddObj.taskPhaseId = 19; 
      //   this.ts.SaveTask(this.taskAddObj).subscribe((data) => { 
   
      //   }); 
      // } 
      this.timeSheetAddObj.assignedTo = this.user[0].id 
      this.timeSheetAddObj.projectId = pid;  
      this.timeSheetAddObj.taskId = tid; 
      
      this.showDate = (this.date) 
      this.timeSheetAddObj.workedDate = this.showDate 
      // console.log(this.timeSheetAddObj.projectId, this.timeSheetAddObj.taskId, this.timeSheetAddObj.workedDate, this.timeSheetAddObj.assignedTo) 
      this.ts.verifyTimeSheet(this.timeSheetAddObj.projectId, this.timeSheetAddObj.taskId, this.timeSheetAddObj.workedDate, this.timeSheetAddObj.assignedTo).subscribe((dataResult) => { 
         
        if (dataResult.length > 0) { 
          if (dataResult[0].status == "Approved") { 
            this.toastr.errorToastr("Your timesheet has been approved already", 'Error'); 
          } 
          else { 
            this.showDate = (this.date) 
            this.timeSheetAddObj.workedDate = this.showDate 
            this.timeSheetAddObj.hours = day1.value 
            this.timeSheetAddObj.percentage = prcntg.value 
            this.ts.updateTimeSheet(this.timeSheetAddObj).subscribe((data) => { 
              this.form.reset(); 
              this.getAllTimeSheetByEmpID() 
              this.getTaskById(); 
              this.toastr.infoToastr(data.message, 'Updated'); 
 
            }) 
          } 
        } 
 
        else { 
          this.timeSheetAddObj.hours = day1.value 
          this.timeSheetAddObj.percentage = prcntg.value 
 
          this.showDate = (this.date) 
          this.timeSheetAddObj.workedDate = this.showDate 
          // console.log(this.timeSheetAddObj) 
          this.ts.addTimeSheet(this.timeSheetAddObj).subscribe((data) => { 
            // console.log(data.message) 
            this.form.reset(); 
            this.getAllTimeSheetByEmpID() 
            this.getTaskById(); 
 
            this.toastr.successToastr(data.message); 
 
          }) 
        } 
      }); 
    } 
    else { 
      this.toastr.errorToastr("Once check the time entry(0-24) and percentage entry with in the limits(0-100)"); 
 
    } 
  } 
 
  getAllTimeSheetByEmpID() { 
    this.ts.getAllTimeSheetByEmpID(this.userSession[0].id).subscribe((data) => { 
      this.allReportsByEmpId = data[0]; 
      this.dataSource = new MatTableDataSource(data[0]) 
      this.dataSource.sort = this.sort 
      this.dataSource.paginator = this.paginator 
      console.log("sample",this.allReportsByEmpId) 
    }) 
 
  } 
  exportTable() { 
    TableUtil.exportToExcel("Example table"); 
 
  } 
  getTaskById() { 
    this.ts.getTasksById(this.userSession[0].id).subscribe((data) => { 
      this.taskDetails = data[0]; 
      this.dataSourceAdd = new MatTableDataSource(data[0]) 
      this.dataSourceAdd.sort = this.sort 
      this.dataSourceAdd.paginator = this.paginator1 
      // console.log("timesheet",this.taskDetails) 
 
    }); 
  } 
  getAllProjects(){ 
    this.ts.GetAllProjectsDetails().subscribe((data) => { 
      this.projectDetails = data; 
      // console.log("detailsproject%%%%%%", this.projectDetails); 
    }); 
  } 

 
  ngOnInit() { 
 
    this.userSession = (JSON.parse(sessionStorage.getItem('user'))) 
    this.getTaskById(); 
 
    this.taskAddObj= new task() 
    // this.ts.getTasksById(this.userSession[0].id).subscribe((data) => { 
    //   this.taskDetails = data[0]; 
    //   console.log(this.taskDetails) 
    // }); 
    this.ts.getUsersById(this.userSession[0].id).subscribe((data) => { 
      this.user = data 
 
 
      if (this.user[0].empDesignation == 4 || this.user[0].empDesignation == 3) { 
        this.ts.getUsersByManagerId(this.user[0].empID).subscribe((data) => { 
          this.teamDetails = data; 
        }); 
      } 
    }) 
    this.getAllTimeSheetByEmpID(); 
    this.getAllProjects(); 
    // this.gettaskid(); 
 
  } 
 
} 
