import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {WebinarService} from '../../../_services/webinar.service';

@Component({
  selector: 'app-schedule-webinar',
  templateUrl: './schedule-webinar.component.html',
  styleUrls: ['./schedule-webinar.component.scss']
})
export class ScheduleWebinarComponent implements OnInit {
  form: FormGroup;
  constructor(private webinarService: WebinarService) {
    this.form = new FormGroup({
        roomId: new FormControl(''),
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
      roomId: this.form.value.roomId,
      name: this.form.value.name
    });
  }

}
