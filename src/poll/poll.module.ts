import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollResolver } from './poll.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { VoteModule } from 'src/vote/vote.module';

@Module({
  imports:[TypeOrmModule.forFeature([Poll]),VoteModule],
  providers: [PollResolver, PollService],
  exports:[PollModule]
})
export class PollModule {}
