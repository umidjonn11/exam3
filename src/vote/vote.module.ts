import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteResolver } from './vote.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Vote])],
  providers: [VoteResolver, VoteService],
})
export class VoteModule {}
