import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.model';
import { VoteModel } from 'src/vote/entities/vote.model';

@ObjectType()
export class PollModel {
  @Field(() => ID)
  id: string;

  @Field()
  question: string;

  @Field(() => [String])
  options: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => User)
  createdBy: User;

  @Field(() => [VoteModel], { nullable: true })
  votes?: VoteModel[];
}
