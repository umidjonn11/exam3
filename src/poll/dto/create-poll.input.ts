import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString, ArrayMinSize } from 'class-validator';

@InputType()
export class CreatePollInput {
  @Field()
  @IsString()
  question: string;

  @Field(() => [String])
  @IsArray()
  @ArrayMinSize(2)
  options: string[];
}
