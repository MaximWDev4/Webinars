import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Invite } from '../invite/invite.entity';

@Entity()
export class Webinar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatroomId: number;

  @Column({type: 'int'})
  start_time: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @OneToMany(() => Invite, invite => invite.webinar)
  invited: Invite[]
}
