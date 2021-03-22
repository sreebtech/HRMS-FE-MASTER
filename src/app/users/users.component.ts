import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {user} from '../models/user';
import {TimeSheetService} from '../services/timesheet.services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {ViewChild} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { MatSort, MatTableDataSource, MatSortable, Sort} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

import { TableUtil } from '../tableUtil';
@Component({
  selector: 'app-root',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  userAddObj: user;
  userDetails: any;
  RolesDetails:any;
  userAllDetails:any
  isCheck:any
  departmentDetails:any
  @ViewChild("frm", {static: true}) form: any;
  displayedColumns = ['empId', 'empName', 'Designation', 'managername', 'departmentName', 'contactNumber', 'act']
  constructor(private ts: TimeSheetService,public toastr: ToastrManager) {
    this.userAddObj =  new user();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getAllDepartments() {
    this.ts.GetAlldepartments().subscribe((data) => {
      this.departmentDetails = data;


    });
  }
  saveUser(){
    if(this.isCheck==true){
      this.userAddObj.userType="Admin";
       }
       else{
        this.userAddObj.userType="Regular";

       }
      this.ts.saveUser(this.userAddObj).subscribe((data) => {
        console.log(data)

          this.toastr.successToastr(data.message);
          this.form.reset();


      this.getAllUser();
    });
  }
  exportTable(){
    TableUtil.exportToExcel("Example table",'users.xlsx');
  }
  GetUserDetailsByRole(){
    this.ts.GetAllUsersByRole().subscribe((data) => {
      this.userDetails = data;
    });
  }
  getAllUser(){
    this.ts.GetAllusers().subscribe((data) => {
      this.userAllDetails = data[0];
      console.log("hello",this.userAllDetails)
      for (let i = 0; i < this.userAllDetails.length; i++) {
        if (this.userAllDetails[i].Status == 'Inactive') {
          this.userAllDetails[i].status = false
        } else {
          this.userAllDetails[i].status = true
        }
      }
      this.dataSource = new MatTableDataSource(data[0])
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
  }
  onChange(status, id) {
    this.ts.GetUsersById(id).subscribe((data) => {
      this.userAddObj.status = status.checked;
      this.ts.updateUsersstatus(id,this.userAddObj).subscribe((data) => {
        this.toastr.successToastr('Toggled Successfully');
        this.ngOnInit()
      })
    })
  }
  getUsersById(id:any){
     this.ts.GetUsersById(id).subscribe((data) => {
      //  console.log(data[0].deptName)
       this.userAddObj.id=data[0].id
       this.userAddObj.empId=data[0].empID;
       this.userAddObj.empName=data[0].empName;
       this.userAddObj.empEmail=data[0].empEmail;
       this.userAddObj.empDesignation=data[0].empDesignation;
       this.userAddObj.managerId=data[0].managerId;
       this.userAddObj.departmentId=data[0].departmentId;
       this.userAddObj.addr1=data[0].addr1;
       this.userAddObj.addr2=data[0].addr2;
       this.userAddObj.addr3=data[0].addr3;
       this.userAddObj.city=data[0].city;
       this.userAddObj.state=data[0].state;
       this.userAddObj.pincode=data[0].pincode;
       this.userAddObj.contactNumber=data[0].contactNumber;
       this.userAddObj.emergencyContact=data[0].emergencyContact;
       this.userAddObj.bloodGroup=data[0].bloodGroup;
       this.userAddObj.userType=data[0].userType;
       console.log(this.userAddObj)
       });

   }
   UpdateUsers(){
    this.ts.updateUsers(this.userAddObj).subscribe((data) => {
      this.getAllUser();
      this.toastr.successToastr(data.message);
      this.form.reset();

    });
  }


  getAllRoles(){
    this.ts.GetAllRoles().subscribe((data) => {
      this.RolesDetails = data;
    });
  }
  ngOnInit() {
this.getAllDepartments()
    this.getAllRoles();
    this.getAllUser();
    this.GetUserDetailsByRole();
    // this.dataSource.sort=this.sort;
    // const sortState: Sort = {active: 'empId', direction: 'desc'};
    // this.sort.active = sortState.active;
    // this.sort.direction = sortState.direction;
    // this.sort.sortChange.emit(sortState);

  }

}
