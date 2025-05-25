import { InputType, Field } from '@nestjs/graphql';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class CreateVoteInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  pollId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  selectedOption: string;
}
