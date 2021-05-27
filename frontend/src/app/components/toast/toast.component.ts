import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ErrorService} from '../../_services/error.service';
import {InfoService} from '../../_services/info.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(private toastr: ToastrService, private errorService: ErrorService, private infoService: InfoService) {}


  ngOnInit(): void {
    this.errorService.execChange.subscribe(value => this.showError(value));
    this.infoService.execChange.subscribe(value => this.showInfo(value));
  }

  showSuccess(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showError(data): void {
    this.toastr.error(data, 'Ошибка');
  }

  private showInfo(value: string): void {
    this.toastr.info(value, 'Внимание');
  }
}
