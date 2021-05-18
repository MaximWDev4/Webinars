export class User {
  id: string;
  userName: string;
  email: string;
  password: string;
  license?: string;
}
export interface RegUser {
  emailreg: string;
  passwordreg: string;
}
