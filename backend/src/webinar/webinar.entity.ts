import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Webinar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatroomId: number;

  @Column()
  url: string;

  @Column()
  name: string;
}
