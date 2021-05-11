import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-schedule-webinar',
  templateUrl: './schedule-webinar.component.html',
  styleUrls: ['./schedule-webinar.component.scss']
})
export class ScheduleWebinarComponent implements OnInit {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
        initTime: new FormControl(''),
        name: new FormControl(''),
        url: new FormControl(''),
      }
    );
  }

  ngOnInit(): void {
  }

}
