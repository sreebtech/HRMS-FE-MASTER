import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TimeSheetService } from '../services/timesheet.services';

@Component({
  selector: 'app-root',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userSession: any;
  user:any
  constructor(private ts: TimeSheetService,private router: Router) { }

  ngOnInit() {
    this.userSession = (JSON.parse(sessionStorage.getItem('user')))
    this.ts.getUsersById(this.userSession[0].id).subscribe((data) => {
      this.user = data
      console.log(data)
    
    });
  }

}
