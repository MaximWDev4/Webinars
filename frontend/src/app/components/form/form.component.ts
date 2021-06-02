import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../../_services/search.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() phone = false;
  @Input() email = false;
  @Input() name = false;
  @Input() id;

  // version = VERSION.full;
  PHONE_MASK = '';
  contact: FormGroup = new FormGroup({hidden: new FormControl()});
  customPatterns = {1: {pattern: new RegExp('\(\[А-ЯA-Zа-яa-z \-\]\)+')}, 2: {pattern: new RegExp('\(\[А-ЯA-Zа-яa-z "\-\]\)+')}};
  modalHref: string;
  showModal = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    if (this.name) {
      this.contact.addControl('Name', new FormControl('', [Validators.required]));
    }
    if (this.email) {this.contact.addControl('Email', new FormControl('', [Validators.required, Validators.pattern(
        // tslint:disable-next-line:max-line-length
        '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'
      )]));
    }
    if (this.phone) {
      this.contact.addControl('phone', new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]));
    }
      // captcha: new FormControl('', [Validators.required])
      // Company: new FormControl('', [Validators.required]),
      // phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
  }

  submit(): void {
    const form: {email: string, userName: string, webinarId: number} = {
      webinarId: this.id,
      userName: this.contact.controls.Name.value,
      email: this.contact.controls.Email.value,
    };
    this.searchService.sendPotentialListener(form).subscribe((api: any) => {
      if (api.message === 'success') {
        this.modalHref = api.href;
        this.showModal = true;
      }
    });
  }

  close(): void {
    setTimeout(() => { this.showModal = !this.showModal; }, 1500);
  }
}
