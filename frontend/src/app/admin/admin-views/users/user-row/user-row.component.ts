import {Component, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {InfoService} from '../../../../_services/info.service';
import {SuccessService} from '../../../../_services/success.service';
import {ErrorService} from '../../../../_services/error.service';
import {UserService} from '../../../../_services/user.service';
import {EventEmitter} from '@angular/core';
import {ModalContentComponent} from '../../../../components/modal-content/modal-content.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {
  @Input() odd: boolean;
  @Input() last: boolean;
  @Input() user: any;
  @Output() changeUser = new EventEmitter();
  expand: boolean;
  form: FormGroup;
  deleted: boolean;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private info: InfoService,
    private success: SuccessService,
    private error: ErrorService,
  ) {
  }

  get f(): {[p: string]: AbstractControl} { return this.form.controls; }

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

  async askIfDelete(): Promise<void> {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.name = 'Вы действительно хотите удалить? Это действие нельзя отменить';
    const res = await modalRef.result;
    if (res === 'Ok') {
      this.delete();
    }
  }

  delete(): void {
    this.userService.deleteUser(this.user.id).subscribe(data => {
      if (data.success) {
        this.success.successChange('Запись удалена');
      } else {
        this.error.errorChange(data.message);
      }
    },
      error => {},
      () => this.changeUser.emit(this.user.id));
    this.deleted = true;
  }

  submit(): void {
    const body: {id: number, email: string,  licence: number, userName: string} = {
      id: +this.user.id,
      email: this.f.email.value,
      userName: this.f.name.value,
      licence: +this.f.licence.value
    };
    this.userService.changeUser(body).subscribe(async (data) => {
        console.log(data);
        if (data.success) {
          this.success.successChange('Успешно изменено');
        } else {
          this.error.errorChange(data.message);
        }
      },
      error => {},
      () => this.changeUser.emit(this.user.id));
  }
}
