// src/users/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from 'src/security/roles.enum';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: UserRole;
}
