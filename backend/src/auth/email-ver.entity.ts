import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmailVerification{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  emailToken: string;
  @Column()
  timestamp: Date;
}
