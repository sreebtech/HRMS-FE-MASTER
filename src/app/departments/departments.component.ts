import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { department } from '../models/department';
import { TimeSheetService } from '../services/timesheet.services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TableUtil } from '../tableUtil';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
declare const $;

@Component({
  selector: 'app-root',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit, AfterViewInit {
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('reportcontent', { static: true }) reportcontent: ElementRef;
  dataTable: any;
  departmentAddObj: department;
  departmentDetails: any;
  @ViewChild("dfrm", { static: true }) form: any;
  dtOption: any;
  displayedColumns = ['deptName', 'deptHead', 'deptNoOfEmployees', 'Action']

  constructor(private ts: TimeSheetService, public toastr: ToastrManager) {
    this.departmentAddObj = new department();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  saveDepartment() {
    this.ts.saveDepartment(this.departmentAddObj).subscribe((data) => {
      this.getAllDepartments();
      this.toastr.successToastr(data.message);
      this.form.reset();

    });
  }

  exportTable() {
    TableUtil.exportToExcel("Example table", 'departments.xlsx');
  }



  downloadPdf() {
    var id= document.getElementById('reportcontent')
    var pdf = new jsPDF('landscape', 'pt', 'a4');
    pdf.fromHTML(id,100,15);
    pdf.save('departments.pdf');
  }

  getAllDepartments() {
    this.ts.GetAlldepartments().subscribe((data) => {
      this.departmentDetails = data;
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator

    });
  }
  getDepartmentsById(id: any) {
    this.ts.GetDepartmentsById(id).subscribe((data) => {
      console.log(data[0].deptName)
      this.departmentAddObj.deptId = data[0].deptId
      this.departmentAddObj.deptName = data[0].deptName;
      this.departmentAddObj.deptHead = data[0].deptHead;
      this.departmentAddObj.deptNoOfEmployees = data[0].deptNoOfEmployees;
      console.log(this.departmentAddObj)
    });

  }
  UpdateDepartment() {
    this.ts.updateDepartment(this.departmentAddObj).subscribe((data) => {
      this.getAllDepartments();
      this.toastr.successToastr(data.message);
      this.form.reset();

    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.getAllDepartments();
  }

}

