import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class Common {
  public static isEmpty(val: any): any {
    return val === null || 'undefined' === typeof val || val === '';
  }

  public static declension(stops: number, values: string[]): any {
    const remainder = stops % 10;
    if (remainder >= 5) {
      return values[2];
    } else if (remainder >= 2) {
      return values[1];
    }
    return values[0];
  }
  public static timeConverter(timestamp: number): string{
    const a = new Date(timestamp);
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + 'г. в' + hour + ':' + min ;
  }

  static TimestampFromUTC(value: {date: NgbDate, time: {hour: number, min: number}}): number {
    console.log(value);
    const jsDate = new Date(value.date.year, value.date.month - 1, value.date.day, value.time.hour, value.time.min);
    console.log(jsDate.getTime());
    return jsDate.getTime();
  }
}
