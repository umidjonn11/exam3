import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VoteService } from './vote.service';
import { VoteModel } from './entities/vote.model';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';

@Resolver(() => VoteModel)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Mutation(() => VoteModel)
  createVote(@Args('createVoteInput') createVoteInput: CreateVoteInput) {
    return this.voteService.create(createVoteInput);
  }

  @Query(() => [VoteModel], { name: 'vote' })
  findAll() {
    return this.voteService.findAll();
  }

  @Query(() => VoteModel, { name: 'vote' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.voteService.findOne(id);
  }

  @Mutation(() => VoteModel)
  updateVote(@Args('updateVoteInput') updateVoteInput: UpdateVoteInput) {
    return this.voteService.update(updateVoteInput.id, updateVoteInput);
  }

  @Mutation(() => VoteModel)
  removeVote(@Args('id', { type: () => Int }) id: number) {
    return this.voteService.remove(id);
  }
}
