import {Component, Input, OnInit, Output} from '@angular/core';
import {expand} from 'rxjs/operators';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {WebinarService} from '../../../../_services/webinar.service';
import {NgbCalendar, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../../../../components/modal-content/modal-content.component';
import {InfoService} from '../../../../_services/info.service';
import {ErrorService} from '../../../../_services/error.service';
import {Common} from '../../../../_helpers/common.helper';
import {NgbDateRuParserFormatter} from '../../../../_helpers/ngb-date-ru-parser-formatter';
import {EventEmitter} from '@angular/core';
import {SuccessService} from '../../../../_services/success.service';

@Component({
  selector: 'app-webinar-row',
  templateUrl: './webinar-row.component.html',
  styleUrls: ['./webinar-row.component.scss']
})
export class WebinarRowComponent implements OnInit {
  @Input() odd: boolean;
  @Input() webinar: { id: number, chatroomId: number, start_time: number, url: string, name: string }
    = {id: 0, start_time: Date.now(), chatroomId: 0, name: '', url: '' };
  @Input() last: boolean;
  @Output() changeWebinar = new EventEmitter();
  expand: boolean;
  form: FormGroup;
  deleted: boolean;

  hoveredDate?: NgbDate;
  minDate: NgbDate;
  maxDate: NgbDate;
  startDate: NgbDate;

  constructor(
    private webinarService: WebinarService,
    private modalService: NgbModal,
    private info: InfoService,
    private success: SuccessService,
    private error: ErrorService,
    private calendar: NgbCalendar,
    public dateFormatter: NgbDateRuParserFormatter) {

    this.minDate = calendar.getPrev(calendar.getToday(), 'm', 6);
    this.maxDate = calendar.getNext(calendar.getToday(), 'm', 6);
  }

  ngOnInit(): void {
    const jsStartDate = new Date(+this.webinar.start_time);
    this.startDate = new NgbDate(jsStartDate.getFullYear(), jsStartDate.getMonth(), jsStartDate.getDate());
    this.form = new FormGroup({
      name: new FormControl(this.webinar.name),
      roomId: new FormControl(this.webinar.chatroomId),
      startTime: new FormControl(this.startDate),
      // this.webinar.start_time)),
      url: new FormControl(this.webinar.url),
    });
  }

  edit(): void {
    this.expand = !this.expand;
  }

  async askIfDelete(): Promise<void> {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.name = 'Вы действительно хотите удалить? Это действие нельзя отменить';
    const res = await modalRef.result;
    if (res === 'Ok') {
      this.delete();
    }
  }

  delete(): void {
    this.webinarService.deleteWebinar(this.webinar.id).subscribe(data => {
      if (data.success) {
        this.success.successChange('Запись удалена');
      } else {
        this.error.errorChange(data.message);
      }
    });
    this.deleted = true;
  }

  async submit(): Promise<void> {
    const body: {id: number, name: string, start_time: number, url: string, chatroomId: number} = {
      id: this.webinar.id,
      name: this.f.name.value,
      chatroomId: this.f.roomId.value,
      start_time: Common.TimestampFromUTC({date: this.f.startTime.value, time: {hour: 0, min: 0}}),
      url: this.f.url.value
    };
    this.webinarService.changeWebinar(body).subscribe(async (data) => {
      console.log(data);
      if (data.success) {
        this.success.successChange('Успешно изменено');
      } else {
        this.error.errorChange(data.message);
      }
    },
        error => {},
      () => this.changeWebinar.emit(this.webinar.id));
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
