import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Webinar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatroomId: number;

  @Column()
  url: Timestamp;

  @Column()
  name: string;
}
