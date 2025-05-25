// login-response.model.ts
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.model';

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;

  @Field()
  refreshToken: string;

  
}
