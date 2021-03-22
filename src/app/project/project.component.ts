import { Component, OnInit } from '@angular/core';
import {project} from '../models/project';
import { TimeSheetService } from '../services/timesheet.services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

import { TableUtil } from '../tableUtil';

@Component({
  selector: 'app-root',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectAddObj: project;
  projectDetails:any;
  clientDetails:any;
  clientDetailsByStatus:any;
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("pfrm", {static: true}) form: any;
  displayedColumns = ['clientName', 'name', 'teamSize', 'act']
  constructor( private ts:TimeSheetService,public toastr: ToastrManager) {
    this.projectAddObj =  new project();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  saveProject(){
    this.ts.saveProject(this.projectAddObj).subscribe((data) => {
      this.toastr.successToastr(data.message);
      this.form.reset();
      this.getAllProjects();
    });
  }

  getAllProjects(){
    this.ts.GetAllProjects().subscribe((data) => {
      this.projectDetails = data;
      console.log(data)

      for (let i = 0; i < this.projectDetails.length; i++) {
        if (this.projectDetails[i].Status == 'Inactive') {
          this.projectDetails[i].status = false
        } else {
          this.projectDetails[i].status = true
        }
      }
      console.log(data)
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
  }
onChange(status, id) {
    this.ts.GetProjectsById(id).subscribe((data) => {
      this.projectAddObj.status = status.checked;
      this.ts.updateProjectstatus(id,this.projectAddObj).subscribe((data) => {
        this.toastr.successToastr('Toggled Successfully');
        this.ngOnInit()
      })
    })
  }
  exportTable(){
    TableUtil.exportToExcel("Example table",'projects.xslx');
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
  getProjectsById(id:any){
    // alert(id)
     this.ts.GetProjectsById(id).subscribe((data) => {
      //  console.log(data[0].deptName)
      this.projectAddObj.clientId=data[0].clientId
       this.projectAddObj.id=data[0].id
       this.projectAddObj.name=data[0].name;
       this.projectAddObj.teamSize=data[0].teamSize;
      // console.log(this.projectAddObj)
       });
 
   }
   UpdateProjects(){
    this.ts.updateProjects(this.projectAddObj).subscribe((data) => {
      this.getAllProjects();
      this.toastr.successToastr(data.message);
      this.form.reset();

    });
  }
  ngOnInit() {
    this.getAllProjects();
    this.getAllClients();
    this.getAllClientsByStatus();

  }
}
