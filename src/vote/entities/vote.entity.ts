import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Poll } from 'src/poll/entities/poll.entity';

@Entity()
@Unique(['user', 'poll'])
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.votes, { eager: true })
  user: UserEntity;

  @ManyToOne(() => Poll, (poll) => poll.votes, { eager: true })
  poll: Poll;

  @Column()
  selectedOption: string;

  @CreateDateColumn()
  createdAt: Date;
}
