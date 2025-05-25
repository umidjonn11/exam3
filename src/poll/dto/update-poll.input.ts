import { InputType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsArray } from 'class-validator';

@InputType()
export class UpdatePollInput {
  @Field(() => ID)
  id: any;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  question?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  options?: string[];
}
