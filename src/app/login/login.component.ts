import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TimeSheetService } from '../services/timesheet.services';
import { loginDetails } from '../models/loginDetails';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lgn: loginDetails;
  session: string;
  email: string;
  password: string;
  show: boolean = false;
  userSession: any;
  constructor(private router: Router, private tss: TimeSheetService, public toastr: ToastrManager) {
    this.lgn = new loginDetails();
  }

  ngOnInit() {
    if (sessionStorage.getItem('user') !== null) {
      this.show = true;
    }
  }
  login(): void {
    this.tss.Savelogin(this.lgn.email, this.lgn.passWord).subscribe((data) => {
      console.log(data)

      if (data.length > 0) {
        sessionStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['Welcome']);
        this.toastr.successToastr("Logged In Successfully");

      }
      else {
        //  this.router.navigate(['/login']);
        this.toastr.errorToastr("Invalid User Name or Password");

      }
    });
  }
 
}
