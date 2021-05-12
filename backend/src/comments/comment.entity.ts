import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Timestamp } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  chatroomId: number;

  @Column()
  timestamp: Timestamp;

  @Column()
  userName: string;

  @Column()
  content: string;
}
