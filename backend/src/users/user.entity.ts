import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  licence: number;

  @Column()
  email: string;

  @Column({ default: false })
  emailVerified: boolean;
}
