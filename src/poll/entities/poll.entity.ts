import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Vote } from 'src/vote/entities/vote.entity';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column("simple-array") 
  options: string[];

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.polls, { eager: true })
  createdBy: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Vote, (vote) => vote.poll)
  votes: Vote[];
}
