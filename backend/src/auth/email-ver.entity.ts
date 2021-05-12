import { Column, Entity } from 'typeorm';

@Entity()
export class EmailVerification{
  @Column()
  email: string;
  @Column()
  emailToken: string;
  @Column()
  timestamp: Date;
}
