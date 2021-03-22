import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TimeSheetService } from '../services/timesheet.services';

@Component({
  selector: 'app-root',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userDetails:any
  email:any;
  mobile:any;
  password:any
  constructor(private ts:TimeSheetService,public toastr: ToastrManager) { }
  verifyEmail(){
    console.log(this.email,this.mobile)
    this.ts.verifyEmail(this.email,this.mobile,this.password).subscribe((data) => {
      this.toastr.infoToastr(data.message);
    });
  }
  ngOnInit() {
  }

}
