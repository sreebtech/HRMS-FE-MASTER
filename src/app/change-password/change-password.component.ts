import { Component, OnInit, ViewChild } from '@angular/core';
import {changePassword} from '../models/changePassword';
import {TimeSheetService} from '../services/timesheet.services';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordAddObj: changePassword;
  userSession:any;
  notify:any;
  confirmPassword:any
  constructor(private ts: TimeSheetService,public toastr: ToastrManager) {
    this.changePasswordAddObj =  new changePassword();
  }
  @ViewChild("chngfrm", {static: true}) form: any;

  changepassword(){
    this.changePasswordAddObj.empId=this.userSession[0].id
    if(this.changePasswordAddObj.confirmPassword=this.changePasswordAddObj.newPassword){
    this.ts.changepassword(this.changePasswordAddObj).subscribe((data) => {
      this.toastr.infoToastr(data.message);
      this.form.reset();



    })
    }
    else{
      this.toastr.errorToastr("Must Enter The Password and Confirm password same");

    }
  }
  ngOnInit() {
    this.userSession = (JSON.parse(sessionStorage.getItem('user')))

  }

}
