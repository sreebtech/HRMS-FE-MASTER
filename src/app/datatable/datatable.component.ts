import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var $ :any;
@Component({
  selector: 'app-root',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
@ViewChild("dataTable", {static: true}) table: any;
dataTable: any;
  constructor() { } 

  ngOnInit():void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable();
  }

}
