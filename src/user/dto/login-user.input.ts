import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class LoginInput {
    @Field(() => String, { nullable: true, defaultValue: 'nima' })  @IsOptional()
  @IsString()
  name?: any;

  @Field(() => String, { nullable: true, defaultValue: 'NIaM.1234' })
  @IsOptional()
  @IsString()
  password?:any;
}
