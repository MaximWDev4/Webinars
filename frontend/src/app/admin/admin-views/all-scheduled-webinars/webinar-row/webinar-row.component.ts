import {Component, Input, OnInit} from '@angular/core';
import {expand} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-webinar-row',
  templateUrl: './webinar-row.component.html',
  styleUrls: ['./webinar-row.component.scss']
})
export class WebinarRowComponent implements OnInit {
  @Input() odd: boolean;
  @Input() webinar: any;
  @Input() last: boolean;
  expand: boolean;
  form: FormGroup;
  deleted: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.webinar.name),
      time: new FormControl(this.webinar.time),
      url: new FormControl(this.webinar.url),
    });
  }

  edit(): void {
    this.expand = !this.expand;
  }

  delete(): void {
    this.deleted = true;
  }

  submit(): void {
    // some service call
  }
}
