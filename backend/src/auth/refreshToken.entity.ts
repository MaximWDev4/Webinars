import { Entity, Column, PrimaryGeneratedColumn,  } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ type: 'longtext'})
  token: string;

}
