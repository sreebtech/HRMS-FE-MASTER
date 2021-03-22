import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';
import { taskPhase } from '../models/taskPhase';
import { TimeSheetService } from '../services/timesheet.services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { TableUtil } from '../tableUtil';

@Component({
  selector: 'app-taskphase',
  templateUrl: './taskphase.component.html',
  styleUrls: ['./taskphase.component.css']
})
export class TaskphaseComponent implements OnInit {
  userSession:any;
  taskPhaseAddObj: taskPhase;
  taskPhaseDetails:any;
  clientDetails:any
  clientDetailsByStatus:any
  user:any;
  projectDetails:any;
  dataSource:any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("tpfrm", {static: true}) form: any;
  displayedColumns = ['clientName', 'projectName', 'taskPhase', 'act']
  constructor(private ts:TimeSheetService,public toastr: ToastrManager) {
    this.taskPhaseAddObj =  new taskPhase();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  saveTaskPhase(){
    this.ts.SaveTaskPhase(this.taskPhaseAddObj).subscribe((data) => {
     this.toastr.successToastr(data.message);
     this.form.reset();
    this.getAllTasksPhases();
     });
   }
  getAllTasksPhases(){
    this.ts.GetAllTaskPhases().subscribe((data) => {
      this.taskPhaseDetails = data;
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator

    });
   }
   exportTable(){
    TableUtil.exportToExcel("Example table",'taskphase.xslx');
  }
   getProjectsByClientId(){
    this.ts.GetProjectsByClientId(this.taskPhaseAddObj.clientId).subscribe((data) => {
      this.projectDetails = data;

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


  getTaskPhaseById(id:any){
    this.ts.GetTaskPhaseById(id).subscribe((data) => {
      //this.clientDetails = data;
      this.taskPhaseAddObj.id = data[0].id;
      this.taskPhaseAddObj.clientId=data[0].clientId;
      this.taskPhaseAddObj.projectId=data[0].projectId
      this.taskPhaseAddObj.taskPhase=data[0].taskPhase;
     console.log((this.taskPhaseAddObj))
     //alert( (this.taskPhaseAddObj))
     
    });
  }
  UpdateTaskPhase(){
    console.log(this.taskPhaseAddObj)
    this.ts.UpateTaskPhase(this.taskPhaseAddObj).subscribe((data) => {
     this.toastr.successToastr(data.message);
     this.form.reset();
    this.getAllTasksPhases();
     });
   }
  ngOnInit() {
    this.getAllClients();
    this.getAllTasksPhases();
    this.getAllClientsByStatus();

  }

}
