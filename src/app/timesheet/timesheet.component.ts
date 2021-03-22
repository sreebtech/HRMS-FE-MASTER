import { Component, OnInit, ElementRef } from '@angular/core';
import { TimeSheetService } from '../services/timesheet.services';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

import { TableUtil } from '../tableUtil';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

import html2canvas from 'html2canvas';
@Component({
  selector: 'app-root',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  userSession: any;
  user: any;
  userDetails: any
  teamDetails: any
  empId: any;
  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;

  ReportsdataById: any
  Approved: any;
  ApprovedReportsbyEmp: any;
  ApprovedReportsbyPro: any
  Rejection: any;
  dataSourceprjct;
  sortEmpId: any;
  projectDetails: any;
  projectDetailsByStatus: any;
  sortProId: any;
  sortStartDate: any;
  sortEndDate: any;
  sortTaskId: any;
  ApprovedReportsbyDate: any
  extractedSortStartDate: any;
  extractedSortEndDate: any
  ApprovedReports: any
  AllReportsdata: any;
  ApprovedReportsbysuperadmin: any;
  ReportsByProjectsForDetails: any
  maxDate = new Date();
  dataSource;
  dataSourceApproval;
  getReportsByTaskId: any;
  dataSourcedate;
  dataSourceDetails;
  dataSourceee;
  EmployeedetailsById: any;
  ProjectDetailsByid: any;
  taskDetails: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("paginator", { static: true }) paginator: MatPaginator;
  @ViewChild("paginator1", { static: true }) paginator1: MatPaginator;
  @ViewChild("paginator2", { static: true }) paginator2: MatPaginator;
  @ViewChild("paginator3", { static: true }) paginator3: MatPaginator;
  @ViewChild("paginator4", { static: true }) paginator4: MatPaginator;
  @ViewChild("paginator5", { static: true }) paginator5: MatPaginator;

  @ViewChild('reportcontent', { static: true }) reportcontent: ElementRef;
  @ViewChild('employee', { static: true }) employee: ElementRef;
  @ViewChild('projects', { static: true }) projects: ElementRef;
  @ViewChild('startdate', { static: true }) startdate: ElementRef;
  @ViewChild('details', { static: true }) details: ElementRef;





  displayedColumns = ['prjctname', 'en', 'ft', 'hs']
  displayedColumnsee = ['workedDate|date', 'projectname', 'description', 'hours']
  displayedColumnsprjct = ['workedDate|date', 'description', 'employeename', 'hours']
  displayedColumnsdate = ['projectname', 'hours', 'status', 'Details']
  displayedColumnsApprove = ['workedDate|date', 'projectname', 'employeename', 'taskDescription', 'hours', 'Action']
  displayedColumnsDetails = ['workedDate|date', 'projectname', 'employeename', 'description', 'hours']


  constructor(private ts: TimeSheetService, public toastr: ToastrManager, private datePipe: DatePipe) { }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSourceee.filter = filterValue;
    this.dataSourceprjct.filter = filterValue;
    this.dataSourcedate.filter = filterValue
    this.dataSourceApproval.filter = filterValue;
  }
  getApprovalPendingTimeSheetByEmpId() {
    console.log("one",this.empId)
    this.ts.getApprovalPendingTimeSheetByEmpId(this.empId).subscribe((data) => {
      this.ReportsdataById = data[0];
      console.log("two",this.ReportsdataById)
      this.dataSourceApproval = new MatTableDataSource(data[0])
      this.dataSourceApproval.sort = this.sort
      this.dataSourceApproval.paginator = this.paginator4

    })
  }


  updateStatus(tid: any, id: any, sd: any, status: any) {
    console.log("three",tid, id, sd, status)
    this.ts.StatusUpdateByManager(tid, id, sd, status).subscribe((data) => {
      this.toastr.successToastr(status)

      if (this.empId != null) {
        this.getApprovalPendingTimeSheetByEmpId()
      }
      else {
        this.ts.getAllApprovalPendingTimeSheetByManagerId(this.user[0].empID).subscribe((data) => {
          this.ReportsdataById = data[0];
          this.dataSourceApproval = new MatTableDataSource(data[0])
          this.dataSourceApproval.sort = this.sort
          this.dataSourceApproval.paginator = this.paginator4


        })
      }
    })
  }
  getReportsByid() {
    this.extractedSortStartDate = this.sortStartDate.getFullYear() + "-" + (this.sortStartDate.getMonth() + 1) + "-" + (this.sortStartDate.getDate())
    this.extractedSortEndDate = this.sortEndDate.getFullYear() + "-" + (this.sortEndDate.getMonth() + 1) + "-" + (this.sortEndDate.getDate())
    this.ts.GetApprovedReportsByEmpId(this.sortEmpId,this.extractedSortStartDate, this.extractedSortEndDate).subscribe((data) => {
      this.ApprovedReportsbyEmp = data[0];
      this.dataSourceee = new MatTableDataSource(data[0])
      console.log("555555",this.dataSourceee)
      this.dataSourceee.sort = this.sort
      this.dataSourceee.paginator = this.paginator1

    })
  }


  getReportsByPro() {
    this.extractedSortStartDate = this.sortStartDate.getFullYear() + "-" + (this.sortStartDate.getMonth() + 1) + "-" + (this.sortStartDate.getDate())
    this.extractedSortEndDate = this.sortEndDate.getFullYear() + "-" + (this.sortEndDate.getMonth() + 1) + "-" + (this.sortEndDate.getDate())
    this.ts.GetApprovedReportsByProId(this.sortProId,this.extractedSortStartDate, this.extractedSortEndDate).subscribe((data) => {
      this.ApprovedReportsbyPro = data[0];
      this.dataSourceprjct = new MatTableDataSource(data[0])
      this.dataSourceprjct.sort = this.sort
      this.dataSourceprjct.paginator = this.paginator2
      console.log("four",this.ApprovedReportsbyPro)
    })
  }
  getReportsByDateRange() {
    //console.log(this.sortStartDate,this.sortEndDate)
    this.extractedSortStartDate = this.sortStartDate.getFullYear() + "-" + (this.sortStartDate.getMonth() + 1) + "-" + (this.sortStartDate.getDate())

    this.extractedSortEndDate = this.sortEndDate.getFullYear() + "-" + (this.sortEndDate.getMonth() + 1) + "-" + (this.sortEndDate.getDate())


    this.ts.GetApprovedReportsByDateRange(this.extractedSortStartDate, this.extractedSortEndDate).subscribe((data) => {
      this.ApprovedReportsbyDate = data[0];
      this.dataSourcedate = new MatTableDataSource(data[0])
      this.dataSourcedate.sort = this.sort
      this.dataSourcedate.paginator = this.paginator3
      console.log("five",this.ApprovedReportsbyDate)
    })
  }

  getReportsByTask() {
    this.ts.GetReportsByTaskId(this.sortTaskId).subscribe((data) => {
      this.getReportsByTaskId = data[0];
      console.log("six",this.getReportsByTaskId)
    });
  };

  getAllProjects() {
    this.ts.GetAllProjects().subscribe((data) => {
      this.projectDetails = data;
      console.log("siven",data);
    });
  }

  getAllprojectsByStatus() {
    this.ts.GetAllprojectsBystatus().subscribe((data) => {
      this.projectDetailsByStatus = data;

    });
  }

  getAllTasks() {
    this.ts.GetAllTask().subscribe((data) => {
      this.taskDetails = data;
      console.log("eight",this.taskDetails)
    })
  }



  getDetailsByProjectId(id: any, sts: any) {
    this.ts.getDetailsByProjectId(id, sts, this.sortStartDate, this.sortEndDate).subscribe((data) => {
      this.ReportsByProjectsForDetails = data[0]

      this.dataSourceDetails = new MatTableDataSource(data[0])
      this.dataSourceDetails.sort = this.sort
      this.dataSourceDetails.paginator = this.paginator5
    })
  }
  exportTable() {
    TableUtil.exportToExcel("Example table", 'reports.xlsx');
  }

  downloadPdf() {
    const doc = new jsPDF('landscape', 'pt', 'a4');
    doc.text(40, 40, 'Reports of All Employees');
    // doc.addPage()
    // doc.text(40,40,'')
    doc.setFont("10px arial, sans-serif");
    doc.setFontType("normal");
    doc.setFontSize(9);
    // doc.setTextColor(255,0,0);
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    const margins = {
      top: 40,
      bottom: 60,
      left: 40,
      width: 922
    };
    const content = this.reportcontent.nativeElement;
    doc.fromHTML(content.innerHTML, margins.left, margins.top, {
      'width': margins.width,
      'elementHandlers': specialElementHandlers
    });
    doc.save('Reports' + '.pdf');
  }
  downloademployeePdf() {
    const doc = new jsPDF('landscape', 'pt', 'a4');
    this.ts.getEmployeeDetailsByid(this.sortEmpId).subscribe((data) => {
      this.EmployeedetailsById = data[0].empName;

      console.log("nine",this.EmployeedetailsById)

      //console.log(this.EmployeedetailsById.empName)
      doc.text(40, 40, 'Reports of ' + this.EmployeedetailsById);
      doc.setFont("10px arial, sans-serif");
      doc.setFontType("normal");
      doc.setFontSize(9);
      // doc.setTextColor(255,0,0);
      const specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        }
      };
      const margins = {
        top: 40,
        bottom: 60,
        left: 40,
        width: 922
      };
      const content = this.employee.nativeElement;
      doc.fromHTML(content.innerHTML, margins.left, margins.top, {
        'width': margins.width,
        'elementHandlers': specialElementHandlers
      });
      doc.save('EmployeeWiseReport' + '.pdf');
    })

  }

  downloadprojectsPdf() {
    const doc = new jsPDF('landscape', 'pt', 'a4');
    this.ts.getProjectDetailsByid(this.sortProId).subscribe((data) => {
      this.ProjectDetailsByid = data[0].name;

      console.log("ten",this.ProjectDetailsByid)

      //console.log(this.EmployeedetailsById.empName)
      doc.text(40, 40, 'Reports of ' + this.ProjectDetailsByid);
      doc.setFont("10px arial, sans-serif");
      doc.setFontType("normal");
      doc.setFontSize(9);
      // doc.setTextColor(255,0,0);
      const specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        }
      };
      const margins = {
        top: 40,
        bottom: 60,
        left: 40,
        width: 922
      };
      const content = this.projects.nativeElement;
      doc.fromHTML(content.innerHTML, margins.left, margins.top, {
        'width': margins.width,
        'elementHandlers': specialElementHandlers
      });
      doc.save('ProjectsWiseReport' + '.pdf');
    })

  }
  // downloadWeekWisePdf() {
  //   const doc = new jsPDF('landscape', 'pt', 'a4');

  //     doc.text(40, 40, 'Reports between ' + this.datePipe.transform(this.sortStartDate, 'dd-MM-yyyy') + ' and ' + this.datePipe.transform(this.sortEndDate, 'dd-MM-yyyy'));
  //     doc.setFont("10px arial, sans-serif");
  //     doc.setFontType("normal");
  //     doc.setFontSize(9);
  //     const specialElementHandlers = {
  //       '#editor': function (element, renderer) {
  //         return true;
  //       }
  //     };
  //     const margins = {
  //       top: 40,
  //       bottom: 60,
  //       left: 40,
  //       width: 922
  //     };
  //     const content = this.startdate.nativeElement;
  //     doc.fromHTML(content.innerHTML, margins.left, margins.top, {
  //       'width': margins.width,
  //       'elementHandlers': specialElementHandlers
  //     });
  //     doc.save('WeekWiseSummaryReport' + '.pdf');


  // }


  downloadWeekWiseDetailsPdf() {
    const doc = new jsPDF('landscape', 'pt', 'a4');
    var img = new Image()
    img.src = ('../assets/sreeb.png')
    doc.addImage(img, 'png', 20, 20, 30, 30)
    doc.setFontType('italic')
    // doc.setTextColor(255, 255, 255);

    // doc.addFont("ConsolasHex.ttf", "ConsolasHex", "Bold");
    // doc.setFont("ConsolasHex","Bold");
    doc.setFontSize(12);

    doc.text(45, 45, 'Reports between ' + this.datePipe.transform(this.sortStartDate, 'dd-MM-yyyy') + ' and ' + this.datePipe.transform(this.sortEndDate, 'dd-MM-yyyy'));
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    const margins = {
      top: 40,
      bottom: 60,
      left: 40,
      width: 922
    };

    const content = this.details.nativeElement;
    doc.fromHTML(content.innerHTML, margins.left, margins.top, {
      'width': margins.width,
      'elementHandlers': specialElementHandlers
    });
    doc.save('DetaieldWeekWiseReport' + '.pdf');


  }

  ngOnInit() {
    this.getAllProjects();
    this.getAllTasks();
    this.getReportsByTask();
    this.getAllprojectsByStatus();
    this.userSession = (JSON.parse(sessionStorage.getItem('user')))
    this.ts.getUsersById(this.userSession[0].id).subscribe((data) => {
      this.user = data;
      console.log("11",this.user)
      if (this.user[0].empDesignation == 4 || this.user[0].empDesignation == 3) {
        this.ts.getUsersByManagerId(this.user[0].empID).subscribe((data) => {
          this.teamDetails = data;
        });

        //alert(this.user[0].empID)
        this.ts.getAllApprovalPendingTimeSheetByManagerId(this.user[0].empID).subscribe((data) => {
          console.log("12",data[0])
          this.ReportsdataById = data[0];
          this.dataSourceApproval = new MatTableDataSource(data[0])
          this.dataSourceApproval.sort = this.sort
          this.dataSourceApproval.paginator = this.paginator4
          console.log("13",this.ReportsdataById[0])

        })

        // console.log(this.user[0].empID)
        this.ts.GetApprovedReportsByManagerId(this.user[0].empID).subscribe((data) => {
          this.ApprovedReports = data[0];
          this.dataSource = new MatTableDataSource(data[0])
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          console.log("14",this.ApprovedReports)

        })
      }


      // if role is super Admin
      if (this.user[0].empDesignation == 9) {
        this.ts.getAllApprovalPendingTimeSheet().subscribe((data) => {
          this.ReportsdataById = data[0];
        })
        this.ts.GetAllusers().subscribe((data) => {
          this.teamDetails = data[0];
        });
        this.ts.GetApprovedReports().subscribe((data) => {
          this.ApprovedReportsbysuperadmin = data[0];
          this.dataSource = new MatTableDataSource(data[0])
          this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator
          console.log("15",this.ApprovedReportsbysuperadmin)
        })
      }
    })
  }
}
