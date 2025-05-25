// src/vote/models/vote.model.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.model';
import { PollModel } from 'src/poll/entities/poll.model';

@ObjectType()
export class VoteModel {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => PollModel)
  poll: PollModel;

  @Field()
  selectedOption: string;

  @Field(() => Date)
  createdAt: Date;
}
