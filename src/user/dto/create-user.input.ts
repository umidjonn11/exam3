// src/users/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from 'src/security/roles.enum';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(2, { message: 'Kamida 2 ta harf bulishi shart' })
  @MaxLength(50, { message: 'Max 50 bilishi kerak' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Email bulishi kerak' })
  email: string;

  @Field()
  @IsString()
  @MinLength(6, { message: 'kamida 6 uzunligida bulishi kerakk' })
  @MaxLength(128, { message: 'Maximum 128 bulishi kerak' })
  password: string;

  @Field()
  @IsEnum(UserRole, { message: 'Role admin|user bulishi kere' })
  role: UserRole;
}
