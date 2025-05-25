import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID, IsString } from 'class-validator';

@InputType()
export class CreateVoteInput {
  @Field(() => ID)
  @IsUUID()
  pollId: string;

  @Field()
  @IsString()
  option: string;
}
