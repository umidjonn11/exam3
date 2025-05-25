import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { LoginInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const user = this.userRepo.create(createUserInput);
    return await this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: any) {
    return this.userRepo.findOne({ where: { id } });
  }
  async validateUser(name: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { name },
      select: ['email', 'id', 'name', 'password', 'name', 'role'],
    });
    try {
      if (!user) throw new NotFoundException('User topilmadi');
      console.log(user);

      const checking = await compare(password, user.password);
      console.log(password, user.password);


      if (!checking) {
        throw new BadRequestException('Parol xato');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(id: any, updateData: any) {
    const user = await this.userRepo.findOneBy({ id });
    if (user) {
      Object.assign(user, updateData);
      await this.userRepo.save(user);
      return user;
    }
    throw new NotFoundException('User topilmadi');
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
  async login(loginData: LoginInput) {
    const user = await this.validateUser(loginData.name, loginData.password);
    const token = await this.jwtService.signAsync({
      id: user?.id,
      role: user?.role,
      name: user?.name,
    });

    const refreshToken = await this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
      },
      { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' },
    );

    await this.updateUser(user.id, { refreshToken: refreshToken });

    return { user, token, refreshToken };
  }
}
