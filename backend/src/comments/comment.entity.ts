import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  chatroomId: number;

  @Column()
  timestamp: number;

  @Column()
  userName: string;

  @Column()
  content: string;
}
