import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable()
export class SuccessService {

  execChange: Subject<any> = new Subject<any>();

  constructor() {}

  /**
   * Use to change user name
   * @data type: string
   */
  successChange(data: string): any {
    this.execChange.next(data);
  }
}
