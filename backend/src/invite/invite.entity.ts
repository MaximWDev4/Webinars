import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Webinar } from '../webinar/webinar.entity';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @ManyToOne(() => Webinar, webinar => webinar.invited)
  webinar: Webinar;
}
