// src/users/models/user.model.ts
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { PollModel } from 'src/poll/entities/poll.model';
import { VoteModel } from 'src/vote/entities/vote.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: false, description: 'User role like admin, customer, etc.' })
  role?: 'admin' | 'user';

  @Field(() => Date)
  created_at: Date;

  @Field(() => [PollModel], { nullable: true })
  polls?: PollModel[];

  @Field(() => [VoteModel], { nullable: true })
  votes?: VoteModel[];

}

/*
// src/user/models/user.model.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Poll } from 'src/poll/models/poll.model';
import { VoteModel } from 'src/vote/models/vote.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  role: 'admin' | 'user';

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [Poll], { nullable: true })
  polls?: Poll[];

  @Field(() => [VoteModel], { nullable: true })
  votes?: VoteModel[];
}
*/