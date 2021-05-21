import {Component, Input, OnInit} from '@angular/core';
import {expand} from 'rxjs/operators';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {WebinarService} from '../../../../_services/webinar.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContentComponent} from '../../../../components/modal-content/modal-content.component';

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

  constructor(private webinarService: WebinarService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.webinar.name),
      roomId: new FormControl(this.webinar.roomId),
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
    // this.webinarService.deleteWebinar(this.webinar.id);
    this.deleted = true;
  }

  submit(): void {
    const body: {id: number, name: string, url: string, roomId: number} = {
      id: this.webinar.id,
      name: this.webinar.name,
      roomId: this.webinar.roomId,
      url: this.webinar.url
    };
    this.webinarService.changeWebinar(body);
  }
}
