import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PollService } from './poll.service';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';
import { PollModel } from './entities/poll.model';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/security/roles.decorator';
import { RolesGuard } from 'src/security/roles-guard';
import { UserRole } from 'src/security/roles.enum';
import { PollResult } from './entities/result.response';

@Resolver(() => PollModel)
export class PollResolver {
  constructor(private readonly pollService: PollService) {}
  @UseGuards( RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => PollModel)
  createPoll(@Args('createPollInput') createPollInput: CreatePollInput) {
    return this.pollService.create(createPollInput);
  }

  @Query(() => [PollModel], { name: 'polls' })
  findAll() {
    return this.pollService.findAll();
  }

  @Query(() => [PollModel])
  async activePolls() {
    return this.pollService.getActivePolls();
  }

  @Query(() => PollModel, { name: 'poll' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pollService.findOne(id);
  }

  @Mutation(() => PollModel)
  updatePoll(@Args('updatePollInput') updatePollInput: UpdatePollInput) {
    return this.pollService.update(updatePollInput.id, updatePollInput);
  }

  @UseGuards( RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => PollModel)
  async deactivatePoll(@Args('id') id: string) {
    return this.pollService.deactivatePoll(id);
  }
  
  @UseGuards( RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => PollModel)
  removePoll(@Args('id', { type: () => ID }) id: any) {
    return this.pollService.remove(id);
  }

  @Query(() => [PollResult])
  async pollResults(@Args('pollId') pollId: string): Promise<PollResult[]> {
    return this.pollService.getPollResults(pollId);
  }
}
