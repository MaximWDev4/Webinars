import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {WebinarService} from '../../../_services/webinar.service';
import {InfoService} from '../../../_services/info.service';
import {ErrorService} from '../../../_services/error.service';

@Component({
  selector: 'app-schedule-webinar',
  templateUrl: './schedule-webinar.component.html',
  styleUrls: ['./schedule-webinar.component.scss']
})
export class ScheduleWebinarComponent implements OnInit {
  form: FormGroup;
  constructor(private webinarService: WebinarService, private info: InfoService, private error: ErrorService) {
    this.form = new FormGroup({
        chatroomId: new FormControl(''),
        startTime: new FormControl('01.06.09'),
        name: new FormControl(''),
        url: new FormControl(''),
      }
    );
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.webinarService.newWebinar({
      url: this.form.value.url,
      chatroomId: this.form.value.roomId,
      name: this.form.value.name
    }).subscribe(data => {
      if (data.success) {
        this.info.infoChange(data.message);
      } else {
        this.error.errorChange(data.message);
      }
    });
  }

}
