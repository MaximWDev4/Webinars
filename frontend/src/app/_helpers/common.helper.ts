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
}
