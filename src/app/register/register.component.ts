import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { subscription } from '../models/subscription'
import { TimeSheetService } from '../services/timesheet.services';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
  subscriptionAddObj: subscription;
  @ViewChild("rfrm", { static: true }) form: any;
  subscriptiondetails: any
  constructor(private ts: TimeSheetService, public toastr: ToastrManager) {
    this.subscriptionAddObj = new subscription
  }


  /* save subscriptions */

  saveCompany() {
    this.ts.savesubscription(this.subscriptionAddObj).subscribe((data) => {
      this.toastr.successToastr(data.message);
      console.log("hiiii")
      this.form.reset();
      
    });
  }

  /* get Subscriptions */
  getAllSubscriptions() {
    this.ts.getallSubscriptions().subscribe((data) => {
      this.subscriptiondetails = data;
      console.log(data);
    });
  }
  ngOnInit() {
    this.getAllSubscriptions();
  }
}
