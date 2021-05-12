export class UserDto {
  constructor(object: any) {
    this.name = object.name;
    this.surname = object.surname;
    this.email = object.email;
    this.phone = object.phone;
  }
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly phone: string;
}
