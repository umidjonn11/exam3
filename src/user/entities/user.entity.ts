import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Poll } from 'src/poll/entities/poll.entity';
import { Vote } from 'src/vote/entities/vote.entity';
import { hash } from 'bcrypt';


@Entity({name:"user"})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Store hashed password

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: 'admin' | 'user';

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Poll, (poll) => poll.createdBy)
  polls: Poll[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hash() {
    this.password = await hash(this.password, 12);
  }
}
