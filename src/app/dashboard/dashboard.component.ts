import { Component, OnInit } from '@angular/core';
import { TimeSheetService } from '../services/timesheet.services';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>;
  userSession: any;
  user: any;
  dataGraph: any;
  options: any;
  dateGraph: any = new Date();
  date: any
  minDate: Date;
  maxDate: any;
  datedata: Date;
  endDateData: Date;
  maxDayDate = new Date();
  firstDateData: Date;
  secondDateData: Date
  ThreeDateData: Date
  fourDateData: Date;
  workedDate: Date;
  hours: any[] = [];
  graphWorkedDate: any[] = []
  graphHours: any[] = [];
  dateList: any
  graphDataList: any;
  graphDataListWorkedDate: Date
  graphSideDataList: any[] = [];
  public showDiv: boolean = true;
  public buttonName: any = 'Show';

  constructor(private ts: TimeSheetService, private router: Router, private datePipe: DatePipe) {

  }
  hide() {
    this.showDiv = false;
  }

  selectData(event) {
    //this.messageService.add({ severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index] });
  }

  getGraph(date: any) {
    this.graphWorkedDate.splice(0, this.graphWorkedDate.length)
    this.graphHours.splice(0, this.graphHours.length)

    this.ts.GetWeek(this.dateGraph).subscribe((data) => {
      console.log(data[0].date)
      this.minDate = (new Date(data[0].date))
      this.datedata = (new Date(this.minDate.getTime() + 1 * 24 * 60 * 60 * 1000))
      this.firstDateData = (new Date(this.minDate.getTime() + 2 * 24 * 60 * 60 * 1000))
      this.secondDateData = (new Date(this.minDate.getTime() + 3 * 24 * 60 * 60 * 1000))
      this.ThreeDateData = (new Date(this.minDate.getTime() + 4 * 24 * 60 * 60 * 1000))
      this.fourDateData = (new Date(this.minDate.getTime() + 5 * 24 * 60 * 60 * 1000))
      this.endDateData = (new Date(this.minDate.getTime() + 6 * 24 * 60 * 60 * 1000))
      this.ts.getForGraph(this.userSession[0].id, this.minDate, this.endDateData).subscribe((data) => {
        this.graphDataList = data[0];
        this.dateList = [this.minDate, this.datedata, this.firstDateData, this.secondDateData, this.ThreeDateData,
        this.fourDateData, this.endDateData]
        for (let i = 0; i < this.dateList.length; i++) {
          this.workedDate = this.dateList[i]
          this.graphWorkedDate.push(this.datePipe.transform(this.workedDate, 'yyyy-MM-dd'));
          for (let j = 0; j < this.graphDataList.length; j++) {
            this.graphDataListWorkedDate = new Date(this.graphDataList[j].workedDate)
            if (this.datePipe.transform(this.workedDate, 'yyyy-MM-dd') == this.datePipe.transform(this.graphDataListWorkedDate, 'yyyy-MM-dd')) {
              this.hours = this.graphDataList[j].hours
              break;
            }
            else {
              this.hours = [0];
            }
          }
          this.graphHours.push(this.hours);
        }


        this.dataGraph = {
          labels: this.graphWorkedDate,
          datasets: [
            {
              label: 'My Worked Hours',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: this.graphHours
            }
          ]

        }
        this.options = {
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        };
      });
    });

    // this.data = {
    //   datasets: [
    //     {
    //       label: 'My Worked Hours',
    //       backgroundColor: '#42A5F5',
    //       borderColor: '#1E88E5',
    //       data: 'pradeep'
    //     }
    //   ]

    // }
  }
  ngOnInit() {
    this.userSession = (JSON.parse(sessionStorage.getItem('user')))
    this.ts.getUsersById(this.userSession[0].id).subscribe((data) => {
      this.user = data
      this.getGraph(this.dateGraph);
    });
    this.showDiv = true;
    setTimeout(() => {
      this.hide();
    }, 3000);
  }
}
