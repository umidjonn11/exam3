import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteResolver } from './vote.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { PollModule } from 'src/poll/poll.module';
import { UsersModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.model';
import { UserEntity } from 'src/user/entities/user.entity';
import { Poll } from 'src/poll/entities/poll.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Vote,UserEntity,Poll]),UsersModule],
  providers: [VoteResolver, VoteService],
  exports:[TypeOrmModule]
})
export class VoteModule {}
