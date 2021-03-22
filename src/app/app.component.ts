import { Component } from '@angular/core';
import { TimeSheetService } from './services/timesheet.services';
import { Router, RouterModule } from '@angular/router';
import { Location } from "@angular/common";
import { BnNgIdleService } from 'bn-ng-idle';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HRMS';
  userSession: any;
  show: boolean = false
  user: any
  constructor(private ts: TimeSheetService, private router: Router, private loc: Location, private bnIdle: BnNgIdleService) {

  }
  logout() {
    sessionStorage.removeItem('user');
    this.user = null;
    this.loc.replaceState('');
    //this.router.navigate(['logout']);
  }

  ngOnInit() {
    this.userSession = (JSON.parse(sessionStorage.getItem('user')))
    if (sessionStorage.getItem('user') != null) {
      this.show = true;
    }
    else {
    }
    this.ts.getUsersById(this.userSession[0].id).subscribe((data) => {
      this.user = data
      console.log("212425",this.user)
    });

    this.bnIdle.startWatching(300).subscribe((res) => {
      if (res) {
        sessionStorage.removeItem('user');
        this.user = null;
        this.loc.replaceState('/login');
        window.location.href = '/login';
      }
    });
  }
}
