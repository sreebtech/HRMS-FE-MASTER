import { Component, OnInit } from '@angular/core';
import { clients } from '../models/clients';
import { TimeSheetService } from '../services/timesheet.services';
import { ToastrManager } from 'ng6-toastr-notifications';
import {ViewChild} from '@angular/core';
import { MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

import { TableUtil } from '../tableUtil';
@Component({
  selector: 'app-root',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clientsAddObj: clients;
  clientDetails:any;
  length:any
  @ViewChild("cfrm", {static: true}) form: any;
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = ['name', 'address1', 'address2', 'address3', 'act']
  constructor(private ts:TimeSheetService,public toastr: ToastrManager){
    this.clientsAddObj =  new clients();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  

  saveClient(){
    this.ts.saveClients(this.clientsAddObj).subscribe((data) => {
      this.toastr.successToastr(data.message);
      this.form.reset();
      this.getAllClients();
    });
  }
  getAllClients(){
    this.ts.GetAllClients().subscribe((data) => {
      this.clientDetails = data;
      for (let i = 0; i < this.clientDetails.length; i++) {
        if (this.clientDetails[i].Status == 'Inactive') {
          this.clientDetails[i].status = false
        } else {
          this.clientDetails[i].status = true
        }
      }
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    });
  }
  onChange(status, id) {
    this.ts.GetClientsById(id).subscribe((data) => {
      this.clientsAddObj.status = status.checked;
      this.ts.updateClientstatus(id,this.clientsAddObj).subscribe((data) => {
        this.toastr.successToastr('Toggled Successfully');
        this.ngOnInit()
      })
    })
  }

  getClientsById(id:any){
    // alert(id)
     this.ts.GetClientsById(id).subscribe((data) => {
      console.log(data[0].id)
       this.clientsAddObj.id=data[0].id
       this.clientsAddObj.name=data[0].name;
       this.clientsAddObj.address1=data[0].address1;
       this.clientsAddObj.address2=data[0].address2 ;
       this.clientsAddObj.address3=data[0].address3 ;
       console.log(this.clientsAddObj)
       });
   }
   UpdateClients(){
    this.ts.updateClients(this.clientsAddObj).subscribe((data) => {
      this.getAllClients();
      this.toastr.successToastr(data.message);
      this.form.reset();
    });
  }
  exportTable(){
    TableUtil.exportToExcel("Example table",'clients.xlsx');
  }
  ngOnInit() {
    this.getAllClients();
  }
}
