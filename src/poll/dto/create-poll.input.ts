import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString, ArrayMinSize, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreatePollInput {

  @Field()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsString()
  question: string;

  @Field(() => [String])
  @IsArray()
  @ArrayMinSize(2)
  options: string[];
}
