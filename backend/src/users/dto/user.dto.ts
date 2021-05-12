export class UserDto {
  constructor(object: any) {
    this.userName = object.userName;
    this.password = object.password;
    this.email = object.email;
    this.licence = object.licence;
  }
  readonly userName: string;
  readonly email: string;
  password: string;
  licence: number;
}
