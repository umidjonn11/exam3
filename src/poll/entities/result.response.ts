import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class PollResult {
  @Field()
  option: string;

  @Field(() => Float)
  percentage: number;

  @Field()
  count: number;
}