import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {WebinarService} from '../../../_services/webinar.service';
import {InfoService} from '../../../_services/info.service';
import {ErrorService} from '../../../_services/error.service';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateRuParserFormatter} from '../../../_helpers/ngb-date-ru-parser-formatter';
import {Common} from '../../../_helpers/common.helper';

@Component({
  selector: 'app-schedule-webinar',
  templateUrl: './schedule-webinar.component.html',
  styleUrls: ['./schedule-webinar.component.scss']
})
export class ScheduleWebinarComponent implements OnInit {
  hoveredDate?: NgbDate;
  minDate: NgbDate;
  maxDate: NgbDate;
  startDate: NgbDate;
  form: FormGroup;
  constructor(
    private webinarService: WebinarService,
    private info: InfoService,
    private error: ErrorService,
    private calendar: NgbCalendar,
    public dateFormatter: NgbDateRuParserFormatter) {

    this.minDate = calendar.getPrev(calendar.getToday(), 'm', 6);
    this.maxDate = calendar.getNext(calendar.getToday(), 'm', 6);

  }

  ngOnInit(): void {
    const now = new Date(Date.now());
    this.startDate = new NgbDate(now.getUTCFullYear(), now.getMonth(), now.getDay() );
    this.form = new FormGroup({
        chatroomId: new FormControl('', [Validators.required, Validators.pattern('^\\d*$')]),
        startTime: new FormControl(this.startDate, [Validators.required]),
        name: new FormControl('', [Validators.required]),
        url: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      }
    );
  }

  submit(): void {
    this.webinarService.newWebinar({
      url: this.f.url.value,
      chatroomId: this.f.chatroomId.value,
      start_time: Common.TimestampFromUTC({date: this.f.startTime.value, time: {min: 0, hour: 0}}),
      name: this.form.value.name
    }).subscribe(data => {
      if (data.success) {
        this.info.infoChange('Вебинар успешно запланирован');
      } else {
        this.error.errorChange(data.message);
      }
    });
  }
  getTime(startTime: number): string {
    return Common.timeConverter(startTime);
  }
  get f(): {[p: string]: AbstractControl} { return this.form.controls; }

  onDateSelection(date: NgbDate, target: any, dateType: string): void {
    this.f.startTime.setValue(date);
    this.startDate = date;
    target.close();
  }

  isInvalid(attr: string): any {
    return (this.form.get(attr)?.touched
      || this.form.get(attr)?.dirty)
      && this.form.get(attr)?.errors;
  }


  getErrors(attr: string): any {
    return this.form.get(attr)?.errors;
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate | null {
    const parsed = this.dateFormatter.parse(input);
    return (parsed && this.calendar.isValid(NgbDate.from(parsed))) ? NgbDate.from(parsed) : currentValue;
  }

  isHovered(date: NgbDate, target: any, minDate: NgbDate, maxDate: NgbDate): any {
    return this.hoveredDate && !target && !date.before(minDate)
      && !date.after(maxDate);
  }

  isDisabled(date: NgbDate, minDate: NgbDate, maxDate: NgbDate): boolean {
    return date.before(minDate) || date.after(maxDate);
  }
}
