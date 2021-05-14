import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {
  @Input() odd: boolean;
  @Input() last: boolean;
  @Input() user: any;
  expand: boolean;
  form: FormGroup;
  deleted: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.user.userName),
      email: new FormControl(this.user.email),
      licence: new FormControl(this.user.licence),
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
