import { Component, OnInit } from '@angular/core';
import { task } from '../models/task';
import { TimeSheetService } from '../services/timesheet.services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {ViewChild} from '@angular/core';
import { taskAssign } from '../models/taskAssign';
import { MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

import { TableUtil } from '../tableUtil';
@Component({
  selector: 'app-root',
  templateUrl: './taskentry.component.html',
  styleUrls: ['./taskentry.component.css']
})
export class TaskentryComponent implements OnInit {
  userSession:any;
  taskAssignObj: taskAssign;
  taskDetails:any;
  taskPhaseDetails:any;
  projectDetails:any;
  departmentDetails:any;
  userDetails:any;
  teamDetails:any;
  clientDetails:any;
  clientDetailsByStatus:any;
  projectDetailsByStatus:any;
  taskAddObj:task
  alltaskdetails:any;
  allassignedtasks:any;
  user:any;
  datedata:any;
  dataSourceass:any;
  taskAddedDetails:any;
  sd:Date;
  ed:Date;
  dateDatae:any;
  @ViewChild("tfrm", {static: true}) form: any;
  @ViewChild("tafrm", {static: true}) forms: any;
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("paginator", { static: true })paginator: MatPaginator;
  @ViewChild("paginator1", {static: true  })paginator1: MatPaginator;

  displayedColumns = ['clientName', 'projectName', 'taskphase', 'description', 'hours', 'act']
  displayedColumnsass = ['clientnm', 'prjctname', 'tp', 'tk', 'td','at','sd','ed','tt','cy' ,'act']


  constructor(private ts:TimeSheetService,public toastr: ToastrManager,private datePipe: DatePipe) {
    this.taskAddObj=new task()
    this.taskAssignObj =  new taskAssign();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSourceass.filter = filterValue;
  }


  saveTask(){
    this.ts.SaveTask(this.taskAddObj).subscribe((data) => {
     this.toastr.successToastr(data.message);
     this.forms.reset();
       this.getAllTasks();
     });
   }

  saveTaskAssign(){
   this.ts.saveTaskAssign(this.taskAssignObj).subscribe((data) => {
    this.toastr.successToastr(data.message);
    this.form.reset();
      this.getAllTasks();
    });
  }

  // getAllTaskPhases(){
  //   this.ts.GetAllTaskPhases().subscribe((data) => {
  //     this.taskPhaseDetails = data;
  //   });
  // }
  getAllTasks(){
    this.ts.GetAllTasks().subscribe((data) => {
      this.taskDetails = data[0];

      console.log("&*^%$",this.taskDetails);
    });
  }

  getAllAddedTasks(){
    this.ts.getAllAddedTasks().subscribe((data)=>{
      this.alltaskdetails =data[0];
      for (let i = 0; i < this.alltaskdetails.length; i++) {
        if (this.alltaskdetails[i].Status == 'Inactive') {
          this.alltaskdetails[i].status = false
        } else {
          this.alltaskdetails[i].status = true
        }
      }
      this.dataSource = new MatTableDataSource(data[0])
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      console.log("345$$$$",this.alltaskdetails)

    })
  }
  onChange(status, id) {
    this.ts.getAllTasksById(id).subscribe((data) => {
      this.taskAddObj.status = status.checked;
      this.ts.updateTaskstatus(id,this.taskAddObj).subscribe((data) => {
        this.toastr.successToastr('Toggled Successfully');
        this.ngOnInit()
      })
    })
  }

  getAllAssignedTasks(){
    this.ts.getAllAssignedTasks().subscribe((data)=>{
      this.allassignedtasks =data[0];
      this.dataSourceass = new MatTableDataSource(data[0])
      this.dataSourceass.sort = this.sort
      this.dataSourceass.paginator = this.paginator1
      console.log("0000",this.allassignedtasks)

    })
  }

  getAllProjects(){
    this.ts.GetAllProjects().subscribe((data) => {
      this.projectDetails = data;
      console.log(this.projectDetails)
    });
  }

  getAllprojectsByStatus(){
    this.ts.GetAllprojectsBystatus().subscribe((data) =>{
      this.projectDetailsByStatus =data;

    });  }
  getAllDepartments(){
    this.ts.GetAlldepartments().subscribe((data) => {
      this.departmentDetails = data;
    });
  }

  getUsersByManagerId(id:any){
    this.ts.getUsersByManagerId(id).subscribe((data) => {
      this.userDetails = data;
    });
  }

  getAllTasksById(id:any){
    this.ts.getAllTasksById(id).subscribe((data) => {
      console.log("one",data[0])
      this.taskAddObj.id = data[0][0].id;
      this.taskAddObj.clientId=data[0][0].clientId
      this.taskAddObj.projectId=data[0][0].projectId
      this.taskAddObj.taskPhaseId=data[0][0].taskPhaseId;
     this.taskAddObj.description=data[0][0].description;
     this.taskAddObj.taskTime=data[0][0].hours;
    });
  }
  UpdateTask(){
    console.log()
    this.ts.UpdateTask(this.taskAddObj).subscribe((data) => {
      this.toastr.successToastr(data.message);
      this.forms.reset();
        this.getAllTasks();
      });
  }

  getAllAssignedTasksById(id:any){
    this.ts.getAllAssignedTasksById(id).subscribe((data) => {
      console.log("two",data[0])
      this.taskAssignObj.id = data[0][0].id;
      this.taskAssignObj.clientId=data[0][0].clientId
      this.taskAssignObj.projectId=data[0][0].projectId
      this.taskAssignObj.taskPhase=data[0][0].taskPhaseId;
      this.taskAssignObj.taskId=data[0][0].taskId;
     this.taskAssignObj.description=data[0][0].description;
     this.taskAssignObj.assignedTo=data[0][0].assignedTo;
     this.sd=(new Date(data[0][0].startDate))
     this.datedata = (new Date(this.sd.getTime()+ 1 * 24 * 60 * 60 * 1000))
     this.taskAssignObj.startDate=(this.datePipe.transform(this.datedata,'MM-dd-yyy'));
     this.ed=(new Date(data[0][0].endDate))
     this.dateDatae = (new Date(this.ed.getTime()+ 1 * 24 * 60 * 60 * 1000))
     this.taskAssignObj.endDate=(this.datePipe.transform(this.dateDatae,'MM-dd-yyy'));
     this.taskAssignObj.taskTime=data[0][0].taskTime;
     this.taskAssignObj.category=data[0][0].category
    });
  }

  UpdateTaskAssign(){
    this.ts.UpdateTaskAssign(this.taskAssignObj).subscribe((data) => {
      this.toastr.successToastr(data.message);
      this.form.reset();
        this.getAllTasks();
      });
  }


  getProjectsByClientId(id:any){
    this.ts.GetProjectsByClientId(id).subscribe((data) => {
      this.projectDetails = data;

    });
  }
  getTaskPhaseByProjectId(id:any){
    this.ts.getTaskPhaseByProjectId(id).subscribe((data) => {
      this.taskPhaseDetails = data;

    });
  }
  getTasksByTaskPhaseId(id:any){
    this.ts.getTasksByTaskPhaseId(id).subscribe((data) => {
      this.taskAddedDetails = data[0];

    });
  }
  getAllClients(){
    this.ts.GetAllClients().subscribe((data) => {
      this.clientDetails = data;
    });
  }

  getAllClientsByStatus(){
    this.ts.GetAllClientsByStatus().subscribe((data) =>{
      this.clientDetailsByStatus =data;
    })
  }
  exportTable(){
    TableUtil.exportToExcel("Example table");
    TableUtil.exportToExcel("Example table2");

  }
  ngOnInit() {
    this.getAllAddedTasks();
    this.getAllClients();
    this.getAllClientsByStatus();
    this.getAllprojectsByStatus()
    this.getAllAssignedTasks();
    this.getAllTasks();
    // this.getAllTaskPhases();
    this.getAllProjects();
    this.getAllDepartments();
    this.userSession=(JSON.parse(sessionStorage.getItem('user')))
    this.ts.getUsersById(this.userSession[0].id).subscribe((data) => {
      this.user = data;

      if(this.user[0].empDesignation==4 ||this.user[0].empDesignation==3 ){
        this.ts.getUsersByManagerId(this.user[0].empID).subscribe((data) => {
          this.teamDetails = data;

        });
      }
      if(this.user[0].empDesignation==9 ){
        this.ts.GetAllusers().subscribe((data) => {
          this.teamDetails = data[0];

        });
      }
    });
  }

}
